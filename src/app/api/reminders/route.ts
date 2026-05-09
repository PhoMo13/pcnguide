import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type IssuedType = "reg9" | "reg10";

type Body = {
  email?: string;
  pcnDate?: string;
  issuedType?: IssuedType;
  pcnRef?: string;
  reducedDeadline?: string;
  fullDeadline?: string;
};

function formatPcnDateForEmail(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  if (
    dt.getFullYear() !== y ||
    dt.getMonth() !== m - 1 ||
    dt.getDate() !== d
  ) {
    return iso;
  }
  return dt.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function buildConfirmationText(payload: {
  pcnRef: string;
  pcnDateFormatted: string;
  reducedDeadline: string;
  fullDeadline: string;
}): string {
  const ref =
    payload.pcnRef.trim() === "" ? "Not provided" : payload.pcnRef.trim();
  return `Your PCN deadline reminders are set.

PCN Reference: ${ref}
PCN Date: ${payload.pcnDateFormatted}

Key deadlines:
- Pay at reduced rate by: ${payload.reducedDeadline}
- Challenge or pay in full by: ${payload.fullDeadline}

We will remind you before these dates.

PCNGuide — pcnguide.co.uk
This is not legal advice. Always check correspondence from your council.`;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const pcnDate = typeof body.pcnDate === "string" ? body.pcnDate.trim() : "";
  const issuedType = body.issuedType;
  const pcnRef = typeof body.pcnRef === "string" ? body.pcnRef : "";
  const reducedDeadline =
    typeof body.reducedDeadline === "string" ? body.reducedDeadline.trim() : "";
  const fullDeadline =
    typeof body.fullDeadline === "string" ? body.fullDeadline.trim() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
  }
  if (!pcnDate || !/^\d{4}-\d{2}-\d{2}$/.test(pcnDate)) {
    return NextResponse.json({ success: false, error: "Invalid pcnDate" }, { status: 400 });
  }
  if (issuedType !== "reg9" && issuedType !== "reg10") {
    return NextResponse.json({ success: false, error: "Invalid issuedType" }, { status: 400 });
  }
  if (!reducedDeadline || !fullDeadline) {
    return NextResponse.json(
      { success: false, error: "Missing deadline fields" },
      { status: 400 },
    );
  }

  const pcnDateFormatted = formatPcnDateForEmail(pcnDate);
  const textBody = buildConfirmationText({
    pcnRef,
    pcnDateFormatted,
    reducedDeadline,
    fullDeadline,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from("email_list").insert({
        email,
        pcn_date: pcnDate,
        pcn_ref: pcnRef.trim() === "" ? null : pcnRef.trim(),
        reduced_deadline: reducedDeadline,
        full_deadline: fullDeadline,
        created_at: new Date().toISOString(),
      });
      if (error) {
        console.error("[reminders] Supabase insert error:", error.message);
      }
    } catch (e) {
      console.error("[reminders] Supabase error:", e);
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log("[reminders] mock (no RESEND_API_KEY):", {
      email,
      pcnDate,
      issuedType,
      pcnRef: pcnRef || null,
      reducedDeadline,
      fullDeadline,
    });
    return NextResponse.json({ success: true, mock: true });
  }

  try {
    const resend = new Resend(resendKey);
    const from =
      process.env.RESEND_FROM ?? "PCNGuide <onboarding@resend.dev>";
    const sendResult = await resend.emails.send({
      from,
      to: email,
      subject: "PCNGuide — Your parking fine deadlines",
      text: textBody,
    });
    if (sendResult.error) {
      console.error("[reminders] Resend error:", sendResult.error);
      return NextResponse.json(
        { success: false, error: "Email send failed" },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true, mock: false });
  } catch (e) {
    console.error("[reminders] Resend exception:", e);
    return NextResponse.json(
      { success: false, error: "Email send failed" },
      { status: 502 },
    );
  }
}
