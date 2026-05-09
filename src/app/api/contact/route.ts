import { NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_TO = "placeholder@pcnguide.co.uk";

const SUBJECT_OPTIONS = [
  "Report an inaccuracy",
  "General enquiry",
  "Business enquiry",
  "Press",
  "Other",
] as const;

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function buildEmailText(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `Contact form — PCNGuide

Name: ${payload.name}
Email: ${payload.email}
Subject: ${payload.subject}

Message:
${payload.message}

---
Submitted via pcnguide.co.uk/contact`;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) {
    return NextResponse.json({ success: false, error: "Name required" }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
  }
  if (!SUBJECT_OPTIONS.includes(subject as (typeof SUBJECT_OPTIONS)[number])) {
    return NextResponse.json({ success: false, error: "Invalid subject" }, { status: 400 });
  }
  if (message.length < 20) {
    return NextResponse.json(
      { success: false, error: "Message must be at least 20 characters" },
      { status: 400 },
    );
  }

  const textBody = buildEmailText({ name, email, subject, message });

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log("[contact] mock (no RESEND_API_KEY):", {
      name,
      email,
      subject,
      message,
    });
    return NextResponse.json({ success: true, mock: true });
  }

  try {
    const resend = new Resend(resendKey);
    const from =
      process.env.RESEND_FROM ?? "PCNGuide <onboarding@resend.dev>";
    const sendResult = await resend.emails.send({
      from,
      to: NOTIFY_TO,
      replyTo: email,
      subject: `PCNGuide contact: ${subject}`,
      text: textBody,
    });
    if (sendResult.error) {
      console.error("[contact] Resend error:", sendResult.error);
      return NextResponse.json(
        { success: false, error: "Email send failed" },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[contact] Resend exception:", e);
    return NextResponse.json(
      { success: false, error: "Email send failed" },
      { status: 502 },
    );
  }
}
