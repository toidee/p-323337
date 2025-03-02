import React, { useState, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface IconInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  helperText?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  (
    {
      className,
      icon,
      rightIcon,
      label,
      helperText,
      onRightIconClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <div className="text-black text-xl font-semibold mb-1.5">{label}</div>
        )}
        <div className="relative flex items-center">
          {icon && <div className="absolute left-3">{icon}</div>}
          <input
            ref={ref}
            className={cn(
              "w-full h-16 text-xl font-semibold text-[#9b9b9b] bg-[#e2e2e2] px-11 py-0 rounded-[20px] border-[none] max-sm:h-[54px] max-sm:text-base",
              icon ? "pl-11" : "pl-4",
              rightIcon ? "pr-11" : "pr-4",
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div
              className="absolute right-3 cursor-pointer"
              onClick={onRightIconClick}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && (
          <div className="text-black text-base italic mt-1.5">{helperText}</div>
        )}
      </div>
    );
  },
);

IconInput.displayName = "IconInput";

export default IconInput;
