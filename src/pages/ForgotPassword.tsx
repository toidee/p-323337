
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const generateTemporaryPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      // Check if user exists
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email)
        .single();

      if (profileError || !profileData) {
        toast.error("No account found with this email address");
        setIsLoading(false);
        return;
      }

      // Generate temporary password
      const tempPassword = generateTemporaryPassword();

      // Update user password and reset password_changed status
      const { error: authError } = await supabase.auth.admin.updateUserById(
        profileData.id,
        { password: tempPassword }
      );

      if (authError) throw authError;

      // Update profile to indicate password needs to be changed
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ password_changed: false })
        .eq("email", email);

      if (updateError) throw updateError;

      // In a real app, you would send an email with the temporary password
      console.log(`Email would be sent to ${email} with temporary password: ${tempPassword}`);
      
      setIsSubmitted(true);
      toast.success("Password reset email sent");
    } catch (error: any) {
      console.error("Error requesting password reset:", error);
      toast.error(error.message || "Failed to process password reset");
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
            Forgot Password
          </h1>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="text-black text-xl font-semibold mb-1.5 block">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 text-lg bg-[#e2e2e2] px-4 rounded-[10px] border-none"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="flex justify-center mb-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-48 h-[54px] text-white text-xl font-bold cursor-pointer bg-[#fe623f] rounded-[20px] border-none hover:bg-[#e55636] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Processing..." : "Reset Password"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <p className="mb-6">
                If an account exists with this email, you will receive a temporary password.
              </p>
              <p className="mb-6">
                Please check your email and follow the instructions to reset your password.
              </p>
            </div>
          )}

          <div className="text-center">
            <Link
              to="/"
              className="text-[#fe623f] hover:text-[#e55636] transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
