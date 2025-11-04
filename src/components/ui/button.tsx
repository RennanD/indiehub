import { Slot } from "@radix-ui/react-slot";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function Button({ className, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "px-4 py-2 h-10 rounded-md bg-primary text-white",
        className,
      )}
      {...props}
    />
  );
}
