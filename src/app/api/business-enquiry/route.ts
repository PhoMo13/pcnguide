import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_TO = "placeholder@pcnguide.co.uk";

type Plan = "basic" | "pro" | "not_sure";

type Body = {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  fleetSize?: string;
  vehicleTypes?: unknown;
  plan?: string;
  message?: string;
};

function normalizeVehicleTypes(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((x): x is string => typeof x === "string" && x.trim() !== "");
}

function buildNotificationText(payload: {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  fleetSize: string;
  vehicleTypes: string[];
  plan: Plan;
  message: string;
}): string {
  const planLabel =
    payload.plan === "basic"
      ? "Basic (£9.99/month)"
      : payload.plan === "pro"
        ? "Pro (£19.99/month)"
        : "Not sure yet";

  return `New business enquiry — PCNGuide

Company: ${payload.companyName}
Contact: ${payload.contactName}
Email: ${payload.email}
Phone: ${payload.phone || "Not provided"}

Fleet size: ${payload.fleetSize}
Vehicle types: ${payload.vehicleTypes.length ? payload.vehicleTypes.join(", ") : "None selected"}
Plan interest: ${planLabel}

Message:
${payload.message.trim() || "(none)"}

---
Submitted via pcnguide.co.uk/business`;
}

function parsePlan(p: string | undefined): Plan | null {
  if (p === "basic" || p === "pro" || p === "not_sure") return p;
  return null;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const companyName =
    typeof body.companyName === "string" ? body.companyName.trim() : "";
  const contactName =
    typeof body.contactName === "string" ? body.contactName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const fleetSize =
    typeof body.fleetSize === "string" ? body.fleetSize.trim() : "";
  const vehicleTypes = normalizeVehicleTypes(body.vehicleTypes);
  const plan = parsePlan(body.plan);
  const message = typeof body.message === "string" ? body.message : "";

  if (!companyName) {
    return NextResponse.json(
      { success: false, error: "Company name required" },
      { status: 400 },
    );
  }
  if (!contactName) {
    return NextResponse.json(
      { success: false, error: "Contact name required" },
      { status: 400 },
    );
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
  }
  if (!fleetSize) {
    return NextResponse.json(
      { success: false, error: "Fleet size required" },
      { status: 400 },
    );
  }
  if (!plan) {
    return NextResponse.json({ success: false, error: "Invalid plan" }, { status: 400 });
  }

  const textBody = buildNotificationText({
    companyName,
    contactName,
    email,
    phone,
    fleetSize,
    vehicleTypes,
    plan,
    message,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from("businesses").insert({
        company_name: companyName,
        contact_name: contactName,
        email,
        phone: phone || null,
        fleet_size: fleetSize,
        vehicle_types: vehicleTypes,
        plan,
        message: message.trim() === "" ? null : message.trim(),
        created_at: new Date().toISOString(),
      });
      if (error) {
        console.error("[business-enquiry] Supabase insert error:", error.message);
      }
    } catch (e) {
      console.error("[business-enquiry] Supabase error:", e);
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log("[business-enquiry] mock (no RESEND_API_KEY):", {
      companyName,
      contactName,
      email,
      phone: phone || null,
      fleetSize,
      vehicleTypes,
      plan,
      message: message.trim() || null,
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
      subject: `Business enquiry: ${companyName}`,
      text: textBody,
    });
    if (sendResult.error) {
      console.error("[business-enquiry] Resend error:", sendResult.error);
      return NextResponse.json(
        { success: false, error: "Email send failed" },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[business-enquiry] Resend exception:", e);
    return NextResponse.json(
      { success: false, error: "Email send failed" },
      { status: 502 },
    );
  }
}
