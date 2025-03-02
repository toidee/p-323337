import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: string;
  iconAlt?: string;
  showPasswordToggle?: boolean;
  showPasswordIcon?: string;
  hidePasswordIcon?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  iconAlt = "Input Icon",
  className,
  type = "text",
  placeholder,
  showPasswordToggle = false,
  showPasswordIcon,
  hidePasswordIcon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-7">
      <label className="text-black text-xl font-semibold ml-14 mb-1.5 block max-sm:text-lg">
        {label}
      </label>
      <div
        className={cn(
          "w-[498px] h-16 flex items-center bg-[#E2E2E2] mx-auto my-0 px-[15px] py-0 rounded-[20px] max-md:w-[90%]",
          isFocused && "ring-2 ring-[#FE623F]",
          className,
        )}
      >
        <img src={icon} className="w-8 h-8" alt={iconAlt} />
        <input
          type={inputType}
          className={cn(
            "bg-transparent border-none outline-none flex-1 ml-3 text-xl font-semibold max-sm:text-lg",
            !isFocused && !props.value && "text-[#9B9B9B]",
          )}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="bg-transparent border-0 cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <img
              src={showPassword ? hidePasswordIcon : showPasswordIcon}
              className="w-[30px] h-[30px] opacity-50"
              alt={showPassword ? "Hide Password" : "Show Password"}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
