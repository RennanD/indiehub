import Link from "next/link";
import { Button } from "@/components/ui/button";

export function TopBannerSection() {
  return (
    <div className="w-full bg-secondary p-5 py-2">
      <div className="w-full max-w-7xl mx-auto flex gap-1 items-center justify-center">
        <p className="text-sm text-foreground">
          Vocês está na versão de trial.{" "}
        </p>
        <Button variant="link" asChild className="text-primary px-0">
          <Link href="/me/upgrade">
            <span>Faça o upgrade agora!</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
