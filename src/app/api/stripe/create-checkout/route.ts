import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const req = await request.json();
  const { metadata } = req;

  const sesssion = await stripe.checkout.sessions.create({
    // customer: metadata.customerId,
    line_items: [
      {
        price: metadata.priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_method_types: ["card", "boleto"],
    metadata,
    success_url: `${request.headers.get("origin")}/me`,
    cancel_url: `${request.headers.get("origin")}/me/upgrade`,
  });

  return NextResponse.json({
    sessionUrl: sesssion.url,
  });
}
