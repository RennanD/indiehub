"use client";

import { Button } from "@/components/ui/button";
import { useStripe } from "@/hooks/use-stripe";

export function UpgradePlanButton({
  priceId,
  popular,
}: {
  priceId: string;
  popular: boolean;
}) {
  const { createStripeCheckout } = useStripe();

  async function handleUpgrade() {
    await createStripeCheckout({
      metadata: {
        priceId,
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
