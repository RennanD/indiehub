import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const req = await request.json();
  const { metadata } = req;

  const session = await auth();

  if (!session || !session.user?.id || !session.user?.email) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const userId = session.user.id;
  const userEmail = session.user.email;
  const userName = session.user.name;

  const userRef = await db
    .collection("users")
    .doc(userId || "")
    .get();

  let customerId: string | undefined;

  if (userRef.exists) {
    customerId = userRef.data()?.customerId;
  }

  if (!customerId) {
    const newCustomer = await stripe.customers.create({
      email: userEmail,
      name: userName || "Sem nome",
      metadata: {
        userId,
      },
    });

    customerId = newCustomer.id;

    await db.collection("users").doc(userId).update({
      customerId,
    });
  }

  const sesssion = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: metadata.priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_method_types: ["card"],
    metadata,
    success_url: `${request.headers.get("origin")}/me`,
    cancel_url: `${request.headers.get("origin")}/me/upgrade`,
    client_reference_id: userId,
  });

  return NextResponse.json({
    sessionUrl: sesssion.url,
  });
}
