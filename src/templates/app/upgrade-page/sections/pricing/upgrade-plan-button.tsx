"use client";

import { Button } from "@/components/ui/button";
import { useStripe } from "@/hooks/use-stripe";

export function UpgradePlanButton({
  priceId,
  plan,
  popular,
}: {
  priceId: string;
  plan: "personal" | "hacker";
  popular: boolean;
}) {
  const { createStripeCheckout } = useStripe();

  async function handleUpgrade() {
    await createStripeCheckout({
      metadata: {
        priceId,
        plan,
      },
    });
  }

  return (
    <Button
      className="w-full mb-8"
      variant={popular ? "default" : "outline"}
      size="lg"
      onClick={handleUpgrade}
    >
      Fazer upgrade
    </Button>
  );
}
