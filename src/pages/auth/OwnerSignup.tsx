
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Lock, Mail, User, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Type for establishment data
type EstablishmentData = {
  businessName: string;
  dtiNumber: string;
  id?: string;
};

const OwnerSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Personal Information
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Step 2: Establishments
  const [establishments, setEstablishments] = useState<EstablishmentData[]>([
    { businessName: "", dtiNumber: "" }
  ]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Validation errors
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
    establishments?: {
      businessName?: string;
      dtiNumber?: string;
    }[];
  }>({});

  const { signup, isLoading, error, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in and email is verified
  useEffect(() => {
    if (user && user.role === "owner" && user.email_confirmed_at) {
      navigate("/owner/dashboard");
    }
  }, [user, navigate]);

  // Validate first step
  const validateStep1 = async () => {
    const stepErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    // First Name validation
    if (!firstName.trim()) {
      stepErrors.firstName = "First name is required";
    }
    
    // Last Name validation
    if (!lastName.trim()) {
      stepErrors.lastName = "Last name is required";
    }
    
    // Email validation
    if (!email.trim()) {
      stepErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      stepErrors.email = "Email format is invalid";
    } else {
      // Check if email already exists
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('email')
          .eq('email', email)
          .single();
        
        if (data || (error && error.message.includes("already registered"))) {
          stepErrors.email = "This email is already registered";
        }
      } catch (err) {
        console.error("Error checking email:", err);
        // Skip email existence check if there's an error
      }
    }
    
    // Password validation
    if (!password) {
      stepErrors.password = "Password is required";
    } else if (password.length < 6) {
      stepErrors.password = "Password must be at least 6 characters";
    }
    
    // Confirm Password validation
    if (!confirmPassword) {
      stepErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      stepErrors.confirmPassword = "Passwords don't match";
    }
    
    setErrors(prevErrors => ({ ...prevErrors, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };
  
  // Validate second step
  const validateStep2 = () => {
    const stepErrors: {
      acceptTerms?: string;
      establishments?: {
        businessName?: string;
        dtiNumber?: string;
      }[];
    } = {
      establishments: []
    };
    
    let isValid = true;
    const businessNames = new Set();
    const dtiNumbers = new Set();
    
    // Terms validation
    if (!acceptTerms) {
      stepErrors.acceptTerms = "You must accept the terms and conditions";
      isValid = false;
    }
    
    establishments.forEach((establishment, index) => {
      const establishmentErrors: {
        businessName?: string;
        dtiNumber?: string;
      } = {};
      
      // Business Name validation
      if (!establishment.businessName.trim()) {
        establishmentErrors.businessName = "Business name is required";
        isValid = false;
      } else if (businessNames.has(establishment.businessName.trim())) {
        establishmentErrors.businessName = "Duplicate Business Name";
        isValid = false;
      } else {
        businessNames.add(establishment.businessName.trim());
      }
      
      // DTI Number validation
      if (!establishment.dtiNumber.trim()) {
        establishmentErrors.dtiNumber = "DTI Certificate No. is required";
        isValid = false;
      } else if (dtiNumbers.has(establishment.dtiNumber.trim())) {
        establishmentErrors.dtiNumber = "Duplicate DTI Certificate No.";
        isValid = false;
      } else {
        dtiNumbers.add(establishment.dtiNumber.trim());
      }
      
      stepErrors.establishments![index] = establishmentErrors;
    });
    
    setErrors(prev => ({ 
      ...prev, 
      acceptTerms: stepErrors.acceptTerms,
      establishments: stepErrors.establishments 
    }));
    return isValid;
  };

  // Go to next step
  const goToNextStep = async () => {
    const isValid = await validateStep1();
    if (isValid) {
      setCurrentStep(2);
    }
  };
  
  // Go back to previous step
  const goToPreviousStep = () => {
    setCurrentStep(1);
  };
  
  // Add new establishment
  const addEstablishment = () => {
    setEstablishments([...establishments, { businessName: "", dtiNumber: "" }]);
  };
  
  // Remove establishment
  const removeEstablishment = (index: number) => {
    const updatedEstablishments = [...establishments];
    updatedEstablishments.splice(index, 1);
    setEstablishments(updatedEstablishments);
  };
  
  // Update establishment field
  const updateEstablishment = (index: number, field: keyof EstablishmentData, value: string) => {
    const updatedEstablishments = [...establishments];
    updatedEstablishments[index] = {
      ...updatedEstablishments[index],
      [field]: value
    };
    setEstablishments(updatedEstablishments);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      await goToNextStep();
      return;
    }
    
    if (!(await validateStep1()) || !validateStep2()) {
      return;
    }
    
    try {
      // Step 1: Register the user with Supabase auth
      const fullName = `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim();
      const success = await signup(email, password, fullName, "owner");
      
      if (success) {
        // Step 2: Get the newly created user's ID
        const { data: { user: newUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw new Error("Failed to retrieve user data: " + userError.message);
        }
        
        if (newUser) {
          // Step 3: Register each establishment with minimal fields
          for (const establishment of establishments) {
            const { error: insertError } = await supabase.from('establishments').insert({
              name: establishment.businessName,
              dti_number: establishment.dtiNumber,
              owner_id: newUser.id
              // All other fields are omitted to use their default NULL values
            });
            
            if (insertError) {
              console.error("Error inserting establishment:", JSON.stringify(insertError, null, 2));
              throw new Error(`Failed to save establishment: ${insertError.message}`);
            }
          }
          
          toast({
            title: "Account created successfully!",
            description: "You can now login with your new account.",
          });
          
          // Sign out the user as they need to verify their email first
          await supabase.auth.signOut();
          
          navigate("/owner/login");
        } else {
          throw new Error("User data not found after signup");
        }
      } else {
        setErrors(prev => ({
          ...prev,
          email: error || "Registration failed. Please try again."
        }));
        setCurrentStep(1);
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: err instanceof Error ? err.message : "There was a problem creating your account.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8">
      <Link to="/" className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text">
          V-FIRE Inspect
        </h1>
      </Link>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
          {currentStep === 2 && (
            <p className="text-gray-500">Establishment Details</p>
          )}
          
          {/* Progress indicator */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className={`h-2 w-16 rounded-full ${currentStep === 1 ? 'bg-orange-500' : 'bg-orange-200'}`}></div>
            <div className={`h-2 w-16 rounded-full ${currentStep === 2 ? 'bg-orange-500' : 'bg-orange-200'}`}></div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentStep === 1 && (
            <>
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              
              {/* Middle Name */}
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  type="text"
                  placeholder="Enter your middle name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>
              
              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
              
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              
              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              
              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
              
              <Button
                type="button"
                className="w-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center"
                onClick={goToNextStep}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
          
          {currentStep === 2 && (
            <>
              <p className="text-gray-500 text-sm mb-4">All establishments will be in 'Unregistered' status initially. You can complete registration after login.</p>
              
              {establishments.map((establishment, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md space-y-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Establishment {index + 1}</h3>
                    {establishments.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEstablishment(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  {/* Business Name */}
                  <div className="space-y-2">
                    <Label htmlFor={`business-${index}`}>Business Name <span className="text-red-500">*</span></Label>
                    <Input
                      id={`business-${index}`}
                      type="text"
                      placeholder="Enter business name"
                      value={establishment.businessName}
                      onChange={(e) => updateEstablishment(index, 'businessName', e.target.value)}
                      className={errors.establishments && errors.establishments[index]?.businessName ? "border-red-500" : ""}
                    />
                    {errors.establishments && errors.establishments[index]?.businessName && (
                      <p className="text-sm text-red-500">{errors.establishments[index]?.businessName}</p>
                    )}
                  </div>
                  
                  {/* DTI Certificate No. */}
                  <div className="space-y-2">
                    <Label htmlFor={`dti-${index}`}>DTI Certificate No. <span className="text-red-500">*</span></Label>
                    <Input
                      id={`dti-${index}`}
                      type="text"
                      placeholder="Enter DTI certificate number"
                      value={establishment.dtiNumber}
                      onChange={(e) => updateEstablishment(index, 'dtiNumber', e.target.value)}
                      className={errors.establishments && errors.establishments[index]?.dtiNumber ? "border-red-500" : ""}
                    />
                    {errors.establishments && errors.establishments[index]?.dtiNumber && (
                      <p className="text-sm text-red-500">{errors.establishments[index]?.dtiNumber}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Add Establishment Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={addEstablishment}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Establishment
              </Button>
              
              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2 mt-6">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                  className="mt-1"
                />
                <div>
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link to="#" className="text-orange-500 hover:underline">
                      terms and conditions
                    </Link>
                  </Label>
                  {errors.acceptTerms && (
                    <p className="text-sm text-red-500">{errors.acceptTerms}</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 flex items-center justify-center"
                  onClick={goToPreviousStep}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                
                <Button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </>
          )}
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link to="/owner/login" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      
      <Link to="/" className="mt-8 text-gray-500 hover:text-gray-700">
        Back to Home
      </Link>
    </div>
  );
};

export default OwnerSignup;
