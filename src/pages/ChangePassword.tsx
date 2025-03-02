
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  useEffect(() => {
    const checkPasswordStatus = async () => {
      if (!user) {
        navigate("/");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("password_changed")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        
        setIsFirstLogin(!data.password_changed);
      } catch (error) {
        console.error("Error checking password status:", error);
      }
    };

    checkPasswordStatus();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      // Update password in Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (authError) throw authError;

      // Update password_changed status in profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ password_changed: true })
        .eq("id", user?.id);

      if (profileError) throw profileError;

      toast.success("Password changed successfully");
      
      // Redirect to dashboard after successful password change
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast.error(error.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-md mx-auto p-6">
        <div className="bg-neutral-100 rounded-[20px] border border-solid border-[#524f4f] p-8">
          <h1 className="text-[#f00] text-3xl font-bold text-center mb-8">
            {isFirstLogin ? "Set New Password" : "Change Password"}
          </h1>

          {isFirstLogin && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                You must set a new password before continuing
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isFirstLogin && (
              <div className="mb-6">
                <label className="text-black text-xl font-semibold mb-1.5 block">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full h-14 text-lg bg-[#e2e2e2] px-4 rounded-[10px] border-none"
                  placeholder="Enter your current password"
                  required={!isFirstLogin}
                />
              </div>
            )}

            <div className="mb-6">
              <label className="text-black text-xl font-semibold mb-1.5 block">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-14 text-lg bg-[#e2e2e2] px-4 rounded-[10px] border-none"
                placeholder="Enter new password"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Must be at least 8 characters
              </p>
            </div>

            <div className="mb-6">
              <label className="text-black text-xl font-semibold mb-1.5 block">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-14 text-lg bg-[#e2e2e2] px-4 rounded-[10px] border-none"
                placeholder="Confirm new password"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-48 h-[54px] text-white text-xl font-bold cursor-pointer bg-[#fe623f] rounded-[20px] border-none hover:bg-[#e55636] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
