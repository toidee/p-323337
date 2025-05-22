
import React, { createContext, useEffect, useState } from "react";
import { User, UserRole, AuthContextType } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

// Create the initial context
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Get user profile from profiles table
          setTimeout(async () => {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();

            if (profileError) {
              console.error("Error fetching profile:", profileError);
              return;
            }

            if (profile) {
              // Type assertion to handle conversion from JSON to our availability_period type
              const availabilityPeriodJson = profile.availability_period;
              const availabilityPeriod = availabilityPeriodJson ? {
                start: typeof availabilityPeriodJson === 'object' && availabilityPeriodJson !== null ? 
                       (availabilityPeriodJson as any).start : undefined,
                end: typeof availabilityPeriodJson === 'object' && availabilityPeriodJson !== null ? 
                     (availabilityPeriodJson as any).end : undefined
              } : undefined;
              
              setUser({
                id: currentSession.user.id,
                email: currentSession.user.email || "",
                name: profile.full_name,
                full_name: profile.full_name, 
                role: profile.role as UserRole,
                position: profile.position,
                date_joined: profile.date_joined,
                status: profile.status,
                duty_status: profile.duty_status,
                availability_period: availabilityPeriod
              });
            }
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        // Get user profile from profiles table
        supabase
          .from('profiles')
          .select('*')
          .eq('id', currentSession.user.id)
          .single()
          .then(({ data: profile, error: profileError }) => {
            if (profileError) {
              console.error("Error fetching profile:", profileError);
              setIsLoading(false);
              return;
            }

            if (profile) {
              // Type assertion to handle conversion from JSON to our availability_period type
              const availabilityPeriodJson = profile.availability_period;
              const availabilityPeriod = availabilityPeriodJson ? {
                start: typeof availabilityPeriodJson === 'object' && availabilityPeriodJson !== null ? 
                       (availabilityPeriodJson as any).start : undefined,
                end: typeof availabilityPeriodJson === 'object' && availabilityPeriodJson !== null ? 
                     (availabilityPeriodJson as any).end : undefined
              } : undefined;
              
              setUser({
                id: currentSession.user.id,
                email: currentSession.user.email || "",
                name: profile.full_name,
                full_name: profile.full_name,
                role: profile.role as UserRole,
                position: profile.position,
                date_joined: profile.date_joined,
                status: profile.status,
                duty_status: profile.duty_status,
                availability_period: availabilityPeriod
              });
            }
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw new Error(signInError.message);
      }

      if (!data.user) {
        throw new Error("No user returned from login");
      }

      // Check if user has the correct role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        throw new Error("Error fetching user profile");
      }

      if (profile.role !== role) {
        await supabase.auth.signOut();
        throw new Error(`This account is not registered as a ${role}`);
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, fullName: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      if (!data.user) {
        throw new Error("No user returned from signup");
      }

      toast({
        title: "Account created successfully!",
        description: "You can now log in with your new account.",
      });

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsLoading(false);
  };

  // Update user function
  const updateUser = async (updatedUser: User): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Update profile in Supabase
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: updatedUser.name || updatedUser.full_name,
          position: updatedUser.position,
          duty_status: updatedUser.duty_status,
          availability_period: updatedUser.availability_period,
          status: updatedUser.status
        })
        .eq('id', updatedUser.id);
      
      if (updateError) {
        throw new Error(updateError.message);
      }
      
      // Update local state
      setUser(updatedUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while updating user");
    } finally {
      setIsLoading(false);
    }
  };

  // Create context value
  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    isLoading,
    error,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
