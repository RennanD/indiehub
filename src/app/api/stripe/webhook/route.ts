import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  const secret = process.env.STRIPE_WEBHOOK_KEY;

  if (!signature || !secret) {
    return NextResponse.json(
      { message: "Missing signature or secret" },
      { status: 400 },
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed": {
        if (event.data.object.payment_status === "paid") {
          const userId = event.data.object.client_reference_id;
          const plan = event.data.object.metadata?.plan;

          if (userId && plan) {
            await db.collection("users").doc(userId).update({
              isTrial: false,
              betaTester: true,
            });
            const snapshot = await db
              .collection("profiles")
              .where("userId", "==", userId)
              .get();

            const profile = snapshot.docs[0].data();

            if (profile) {
              await db.collection("profiles").doc(profile.slug).update({
                plan: plan,
                betaTester: true,
              });
            }
          }
        }

        if (
          event.data.object.payment_status === "unpaid" &&
          event.data.object.payment_intent
        ) {
          const patmentIntent = await stripe.paymentIntents.retrieve(
            event.data.object.payment_intent.toString(),
          );
          const hostedVoucherUrl =
            patmentIntent.next_action?.boleto_display_details
              ?.hosted_voucher_url;

          if (hostedVoucherUrl) {
            const userEmail = event.data.object.customer_details?.email;
            console.log(`enviar e-mail para ${userEmail}`);
          }
        }
        break;
      }
      case "checkout.session.async_payment_succeeded": {
        if (event.data.object.payment_status === "paid") {
          const userId = event.data.object.client_reference_id;
          const plan = event.data.object.metadata?.plan;

          if (userId && plan) {
            await db.collection("users").doc(userId).update({
              plan: plan,
              isTrial: false,
              betaTester: true,
            });
          }
        }
        break;
      }

      // Add more cases to handle other event types as needed
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      {
        message: `Webhook Error: ${(error as Error).message}`,
      },
      { status: 500 },
    );
  }
}
