
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, icon, iconPosition = 'left', ...props }, ref) => {
    return (
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <Input
          className={cn(
            iconPosition === 'left' && "pl-10",
            iconPosition === 'right' && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
    );
  }
);

IconInput.displayName = "IconInput";

export default IconInput;
