
import React, { useState } from "react";
import InputField from "./InputField";
import Button from "../common/Button";
import { useAuth } from "@/context/AuthContext";

interface LoginCardProps {
  adminLogoUrl: string;
  emailIconUrl: string;
  passwordIconUrl: string;
  showPasswordIconUrl: string;
  hidePasswordIconUrl?: string;
  onLogin?: (email: string, password: string) => Promise<void>;
  onForgotPassword?: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({
  adminLogoUrl,
  emailIconUrl,
  passwordIconUrl,
  showPasswordIconUrl,
  hidePasswordIconUrl = showPasswordIconUrl,
  onLogin,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (onLogin) {
        await onLogin(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center pt-[159px]">
      <div className="w-[605px] h-[564px] border relative bg-neutral-100 rounded-[20px] border-solid border-[#524F4F] max-md:w-[90%] max-md:max-w-[605px]">
        <img
          src={adminLogoUrl}
          className="w-[88px] h-[131px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] absolute -translate-x-2/4 rounded-[20px] left-2/4 top-3.5"
          alt="Admin Logo"
        />
        <h1 className="text-[#F00] text-[40px] font-bold text-center mt-[116px] max-sm:text-[32px]">
          ADMIN LOG IN
        </h1>

        <form onSubmit={handleSubmit}>
          <InputField
            label="E-mail:"
            icon={emailIconUrl}
            iconAlt="Email Icon"
            type="email"
            placeholder="Enter your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField
            label="Password :"
            icon={passwordIconUrl}
            iconAlt="Password Icon"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle
            showPasswordIcon={showPasswordIconUrl}
            hidePasswordIcon={hidePasswordIconUrl}
            required
          />

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-black text-base italic font-medium ml-[57px] bg-transparent border-0 cursor-pointer"
          >
            Forgot Password?
          </button>

          <div className="flex justify-center mt-6">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "LOGGING IN..." : "LOG IN"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
