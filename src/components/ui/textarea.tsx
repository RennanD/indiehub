import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, errorMessage, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            "relative rounded-md border p-2.5 bg-foreground group border-text-muted/50 hover:border-primary focus-within:border-primary",
            {
              "border-red-400 hover:border-red-400 focus-within:border-red-400":
                !!errorMessage,
            },
          )}
        >
          <textarea
            className={cn(
              "placeholder-text-muted text-accent outline-none w-full resize-none min-h-[100px]",
              className,
            )}
            ref={ref}
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

Textarea.displayName = "Textarea";
