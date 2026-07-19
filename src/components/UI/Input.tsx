import { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-10 rounded-md border border-border bg-white px-3 text-sm text-ink",
            "placeholder:text-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
            error &&
              "border-rejected focus:ring-rejected focus:border-rejected",
            className,
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-rejected">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
