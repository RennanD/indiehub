import type { LucideProps } from "lucide-react";

import {
  type ComponentType,
  forwardRef,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ComponentType<LucideProps>;
  prefix?: string;

  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon: Icon, errorMessage, prefix, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            "relative h-10 rounded-md flex grounded-md border p-2.5 bg-foreground group border-text-muted/50 hover:border-primary focus-within:border-primary",
            {
              "border-red-400 hover:border-red-400 focus-within:border-red-400":
                !!errorMessage,
              className,
            },
          )}
        >
          {prefix && (
            <div className="pointer-events-none flex items-center">
              <span className="text-accent">{prefix}</span>
            </div>
          )}
          {Icon && (
            <div className="pointer-events-none flex items-center mr-3">
              <Icon className="size-5" />
            </div>
          )}
          <input
            className={cn(
              "placeholder-text-muted text-accent outline-none flex-1",
            )}
            ref={ref}
            type="text"
            {...rest}
          />
        </div>
        {errorMessage && (
          <span className="text-[14px] leading-[22.4px] text-red-400">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
