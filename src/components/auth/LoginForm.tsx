
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import IconInput from "@/components/ui/IconInput";
import loginIcon from "@/assets/images/login-icon.svg";
import emailIcon from "@/assets/images/email-icon.svg";
import passwordIcon from "@/assets/images/password-icon.svg";
import showPasswordIcon from "@/assets/images/show-password.svg";
import { toast } from "sonner";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      // Navigation happens in AuthContext after checking if user is admin
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-[605px] border bg-neutral-100 p-10 rounded-[20px] border-solid border-[#524f4f] max-md:w-full max-sm:p-5">
      <img
        src={loginIcon}
        className="w-[88px] h-[131px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] block mt-0 mb-5 mx-auto rounded-[20px]"
        alt="Login Icon"
      />
      <div className="text-[#f00] text-[40px] font-bold text-center mb-10 max-sm:text-[32px]">
        LOG IN
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-[30px]">
          <IconInput
            type="email"
            label="E-mail:"
            placeholder="Enter your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<img src={emailIcon} alt="Email Icon" className="w-8 h-8" />}
            required
          />
        </div>

        <div className="mb-[30px]">
          <IconInput
            type={showPassword ? "text" : "password"}
            label="Password :"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              <img src={passwordIcon} alt="Password Icon" className="w-8 h-8" />
            }
            rightIcon={
              <img
                src={showPasswordIcon}
                alt="Show Password"
                className="w-[30px] h-[30px] opacity-50"
              />
            }
            onRightIconClick={togglePasswordVisibility}
            helperText={
              <Link to="/forgot-password" className="text-[#88b7b9] hover:text-[#6a9799] transition-colors">
                Forgot Password?
              </Link>
            }
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-40 h-[54px] text-white text-xl font-bold cursor-pointer bg-[#fe623f] block mx-auto my-5 rounded-[20px] border-[none] hover:bg-[#e55636] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "LOG IN"}
        </button>
      </form>

      <div className="text-center text-base italic mt-5">
        <span>No Account Yet? </span>
        <Link to="/register" className="underline cursor-pointer hover:text-[#fe623f] transition-colors">
          Register Here
        </Link>
      </div>

      <div className="text-center text-sm font-semibold text-black mt-5">
        <span>By continuing, you agree to V-Fire Inspect </span>
        <span className="text-[#88b7b9] underline cursor-pointer hover:text-[#6a9799] transition-colors">
          Terms and Conditions
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
