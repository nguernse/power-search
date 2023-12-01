import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative h-10 w-full rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none bg-slate-100 rounded-l-full">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "w-full h-full text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 rounded-md",
            className,
            icon ? "pl-14 pr-5" : "px-2"
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
