import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "font-bold rounded-[20px] flex items-center justify-center";

  const variantStyles = {
    primary: "bg-[#FE623F] text-white",
    secondary: "bg-gray-200 text-black",
    outline: "bg-transparent border-2 border-[#FE623F] text-[#FE623F]",
  };

  const sizeStyles = {
    sm: "text-base h-10 px-4",
    md: "text-xl h-[54px] px-6",
    lg: "text-2xl h-16 px-8",
  };

  const widthStyle = fullWidth ? "w-full" : "w-40";

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyle,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
