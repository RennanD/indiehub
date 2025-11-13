import { cn } from "@/lib/utils";

interface GradientProps {
  position?: "fixed" | "absolute";
}

export function Gradient({ position = "fixed" }: GradientProps) {
  return (
    <>
      <div
        className={cn(
          "inset-0 -z-10 bg-linear-to-br from-background via-primary/4 to-secondary/6 dark:from-background dark:via-primary/5 dark:to-secondary/4",
          {
            fixed: position === "fixed",
            absolute: position === "absolute",
          },
        )}
      />
      <div
        className={cn(
          "inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent dark:from-primary/8",
          {
            fixed: position === "fixed",
            absolute: position === "absolute",
          },
        )}
      />
    </>
  );
}
