import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { stripe, webhookSecret } from "@/lib/stripe";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new NextResponse("Missing stripe-signature", { status: 400 });

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(body, sig, webhookSecret());
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    logger.error("Stripe webhook signature verification failed", { msg });
    return new NextResponse(`Webhook Error: ${msg}`, { status: 400 });
  }

  // TODO: wire up handlers when ordering + payment flow lands.
  switch (event.type) {
    case "payment_intent.succeeded":
    case "payment_intent.payment_failed":
    case "checkout.session.completed":
    case "charge.refunded":
      logger.info("Stripe event received", { type: event.type, id: event.id });
      break;
    default:
      logger.debug("Unhandled Stripe event", { type: event.type });
  }

  return NextResponse.json({ received: true });
}
