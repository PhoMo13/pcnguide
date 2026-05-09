import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PRICES_PENCE = {
  standard: 699,
  premium: 1499,
} as const;

type Tier = keyof typeof PRICES_PENCE;

export async function POST(req: Request) {
  let body: { tier?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const tier = body.tier as Tier;
  if (tier !== "standard" && tier !== "premium") {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY?.trim() || !stripe) {
    return NextResponse.json({
      clientSecret: "test_mock_secret",
      mock: true,
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: PRICES_PENCE[tier],
      currency: "gbp",
      payment_method_types: ["card"],
      metadata: { tier },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      mock: false,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not create payment intent" },
      { status: 500 },
    );
  }
}
