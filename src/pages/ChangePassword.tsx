import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from 'react-helmet';
import IconInput from "@/components/ui/IconInput";
import Header from "@/components/layout/Header";
import { supabase } from "@/integrations/supabase/client";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Check if password_changed is false before allowing password change
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('password_changed')
        .eq('id', user.id)
        .single();

      if (userError) {
        throw new Error("Could not verify user status.");
      }

      if (userData && userData.password_changed) {
        toast({
          variant: "destructive",
          title: "Password Already Changed",
          description: "You have already changed your password once.",
        });
        return;
      }

      const { error } = await supabase.auth.updateUser({ password: password });

      if (error) {
        throw new Error(error.message);
      }

      // Update password_changed to true after successful password change
      await supabase
        .from('profiles')
        .update({ 
          password_changed: true 
        })
        .eq('id', user.id);

      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      });

      navigate("/owner/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      toast({
        variant: "destructive",
        title: "Failed to Change Password",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Change Password - V-FIRE Inspect</title>
        <meta name="description" content="Change your password" />
      </Helmet>
      
      <Header title="Change Password" />

      <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Change Your Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ensure your account is secure with a strong password.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </Label>
                <div className="mt-1">
                  <IconInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                    iconPosition="left"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </Label>
                <div className="mt-1">
                  <IconInput
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                    iconPosition="left"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                disabled={isLoading}
              >
                {isLoading ? "Changing Password..." : "Change Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
