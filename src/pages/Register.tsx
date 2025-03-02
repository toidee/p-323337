
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import BusinessRowInput from "@/components/auth/BusinessRowInput";

interface BusinessRow {
  id: string;
  businessName: string;
  dtiNumber: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [businessRows, setBusinessRows] = useState<BusinessRow[]>([
    { id: "1", businessName: "", dtiNumber: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addBusinessRow = () => {
    setBusinessRows([
      ...businessRows,
      { id: Date.now().toString(), businessName: "", dtiNumber: "" },
    ]);
  };

  const removeBusinessRow = (id: string) => {
    if (businessRows.length > 1) {
      setBusinessRows(businessRows.filter((row) => row.id !== id));
    } else {
      toast.error("At least one business is required");
    }
  };

  const updateBusinessRow = (
    id: string,
    field: "businessName" | "dtiNumber",
    value: string
  ) => {
    setBusinessRows(
      businessRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!firstName || !lastName || !email) {
      toast.error("Please fill out all required fields");
      return;
    }

    // Validate business rows
    for (const row of businessRows) {
      if (!row.businessName || !row.dtiNumber) {
        toast.error("Please fill out all business details");
        return;
      }
    }

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Check if email already exists in pending_users
      const { data: existingPendingUser } = await supabase
        .from("pending_users")
        .select("email")
        .eq("email", email)
        .single();

      if (existingPendingUser) {
        toast.error("Registration request already pending for this email");
        setIsLoading(false);
        return;
      }

      // Check if email already exists in profiles
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email)
        .single();

      if (existingUser) {
        toast.error("User with this email already exists");
        setIsLoading(false);
        return;
      }

      // Add user to pending_users table
      const { error } = await supabase.from("pending_users").insert([
        {
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          email: email,
          businesses: businessRows.map(row => ({
            name: row.businessName,
            dti_number: row.dtiNumber
          })),
          status: "pending",
          requested_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Error submitting registration:", error);
        toast.error("Failed to submit registration");
        setIsLoading(false);
        return;
      }

      toast.success("Registration submitted! Please wait for admin approval");
      
      // Reset form
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setEmail("");
      setBusinessRows([{ id: "1", businessName: "", dtiNumber: "" }]);
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-3xl mx-auto p-6">
        <div className="bg-neutral-100 rounded-[20px] border border-solid border-[#524f4f] p-8">
          <h1 className="text-[#f00] text-3xl font-bold text-center mb-8">
            BUSINESS REGISTRATION
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-black text-xl font-semibold mb-1.5 block">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full h-14 text-lg bg-[#e2e2e2] px-4 rounded-[10px] border-none"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              
              <div>
                <label className="text-black text-xl font-semibold mb-1.5 block">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full h-14 text-lg bg-[#e2e2e2] px-4 rounded-[10px] border-none"
                  placeholder="Enter your middle name"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-black text-xl font-semibold mb-1.5 block">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-14 text-lg bg-[#e2e2e2] px-4 rounded-[10px] border-none"
                placeholder="Enter your last name"
                required
              />
            </div>

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

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-black text-xl font-semibold">
                  Business Information <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={addBusinessRow}
                  className="bg-[#FE623F] text-white px-3 py-1 rounded-md font-semibold"
                >
                  + Add Business
                </button>
              </div>

              {businessRows.map((row) => (
                <BusinessRowInput
                  key={row.id}
                  id={row.id}
                  businessName={row.businessName}
                  dtiNumber={row.dtiNumber}
                  onUpdate={updateBusinessRow}
                  onRemove={removeBusinessRow}
                  canRemove={businessRows.length > 1}
                />
              ))}
            </div>

            <div className="text-center text-sm font-semibold text-black mt-6 mb-6">
              <p>
                By continuing, you agree to V-Fire Inspect{" "}
                <span className="text-[#88b7b9] underline cursor-pointer hover:text-[#6a9799] transition-colors">
                  Terms and Conditions
                </span>
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-48 h-[54px] text-white text-xl font-bold cursor-pointer bg-[#fe623f] rounded-[20px] border-none hover:bg-[#e55636] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "REGISTER"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
