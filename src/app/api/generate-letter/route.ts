import { NextResponse } from "next/server";
import {
  buildPrompt,
  LETTER_SYSTEM_PROMPT,
  type AppealData,
} from "@/lib/letterPrompt";

const MODEL = "claude-sonnet-4-20250514";

function buildMockLetter(data: AppealData): string {
  return `Dear Parking Appeals Team,

I am writing to formally challenge Penalty Charge Notice ${data.pcnNumber} issued on ${data.pcnDate} in respect of vehicle ${data.vehicleReg} at ${data.location}.

[This is a preview of your generated appeal letter. Add your Anthropic API key to generate real letters.]

Yours faithfully,
The Registered Keeper`;
}

function extractSection(
  full: string,
  startMarker: string,
  endMarker: string | null,
): string {
  const start = full.indexOf(startMarker);
  if (start === -1) return "";
  const from = start + startMarker.length;
  if (!endMarker) return full.slice(from).trim();
  const end = full.indexOf(endMarker, from);
  if (end === -1) return full.slice(from).trim();
  return full.slice(from, end).trim();
}

function parsePremiumResponse(full: string) {
  const first = extractSection(
    full,
    "===PCNGUIDE_FIRST_APPEAL===",
    "===PCNGUIDE_NTO_LETTER===",
  );
  const nto = extractSection(
    full,
    "===PCNGUIDE_NTO_LETTER===",
    "===PCNGUIDE_EVIDENCE_CHECKLIST===",
  );
  const checklist = extractSection(
    full,
    "===PCNGUIDE_EVIDENCE_CHECKLIST===",
    "===PCNGUIDE_SUBMISSION_GUIDE===",
  );
  const guide = extractSection(
    full,
    "===PCNGUIDE_SUBMISSION_GUIDE===",
    null,
  );
  return { first, nto, checklist, guide };
}

function isAppealData(x: unknown): x is AppealData {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    (o.tier === "standard" || o.tier === "premium") &&
    typeof o.contraventionCode === "string" &&
    typeof o.contraventionDescription === "string" &&
    typeof o.pcnNumber === "string" &&
    typeof o.pcnDate === "string" &&
    typeof o.vehicleReg === "string" &&
    typeof o.issuingCouncil === "string" &&
    typeof o.location === "string" &&
    Array.isArray(o.grounds) &&
    Array.isArray(o.evidence) &&
    typeof o.additionalInfo === "string"
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isAppealData(body)) {
    return NextResponse.json({ error: "Invalid appeal data" }, { status: 400 });
  }

  const data = body;
  const mockLetter = buildMockLetter(data);

  if (!process.env.ANTHROPIC_API_KEY?.trim()) {
    if (data.tier === "premium") {
      return NextResponse.json({
        letter: mockLetter,
        ntoLetter:
          "[NtO-stage letter template — add ANTHROPIC_API_KEY for a full generated version.]",
        evidenceChecklist:
          "1. Copy of the PCN and any photographs you hold\n2. Payment or permit evidence if applicable\n3. Any correspondence with the council",
        submissionGuide:
          "1. Check your PCN for the correct postal or online address for representations.\n2. Keep a copy of everything you send.\n3. Note the deadline on your notice and verify it with the council.",
      });
    }
    return NextResponse.json({ letter: mockLetter });
  }

  const maxTokens = data.tier === "premium" ? 4000 : 2000;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        system: LETTER_SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: buildPrompt(data),
          },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Anthropic error", res.status, errText);
      return NextResponse.json(
        { error: "Letter generation failed" },
        { status: 502 },
      );
    }

    const json = (await res.json()) as {
      content?: { type: string; text?: string }[];
    };
    const text = json.content?.find((c) => c.type === "text")?.text ?? "";

    if (data.tier === "premium") {
      const parsed = parsePremiumResponse(text);
      const hasDelimiters = text.includes("===PCNGUIDE_FIRST_APPEAL===");
      return NextResponse.json({
        letter: hasDelimiters ? parsed.first || text : text,
        ntoLetter: hasDelimiters ? parsed.nto : undefined,
        evidenceChecklist: hasDelimiters ? parsed.checklist : undefined,
        submissionGuide: hasDelimiters ? parsed.guide : undefined,
      });
    }

    return NextResponse.json({ letter: text || mockLetter });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Letter generation failed" },
      { status: 500 },
    );
  }
}
