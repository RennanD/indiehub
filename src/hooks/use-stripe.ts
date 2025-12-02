import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string,
      );
      setStripe(stripeInstance);
    }

    loadStripeAsync();
  }, []);

  async function createStripeCheckout({
    metadata,
  }: {
    metadata: Record<string, string>;
  }) {
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metadata }),
      });

      const data = await response.json();

      console.log("Redirecting to Stripe checkout:", data.sessionUrl);

      window.location.href = data.sessionUrl;
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
    }
  }

  return { stripe, createStripeCheckout };
}
