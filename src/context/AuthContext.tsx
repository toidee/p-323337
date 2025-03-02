
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define the structure of a profile
interface Profile {
  id: string;
  email: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  is_admin: boolean;
  password_changed: boolean;
  created_at: string;
  updated_at: string;
}

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  isPasswordChanged: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        try {
          // Check user profile data
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin, password_changed')
            .eq('id', session.user.id)
            .single();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
            setIsAdmin(false);
            setIsPasswordChanged(true);
          } else if (profile) {
            setIsAdmin(profile.is_admin || false);
            setIsPasswordChanged(profile.password_changed !== false);
          } else {
            setIsAdmin(false);
            setIsPasswordChanged(true);
          }
        } catch (err) {
          console.error('Error checking user status:', err);
          setIsAdmin(false);
          setIsPasswordChanged(true);
        }
      }
      
      setIsLoading(false);
    };

    setData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Check user profile when auth state changes
        supabase
          .from('profiles')
          .select('is_admin, password_changed')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching profile:', error);
              setIsAdmin(false);
              setIsPasswordChanged(true);
            } else if (data) {
              setIsAdmin(data.is_admin || false);
              setIsPasswordChanged(data.password_changed !== false);
            } else {
              setIsAdmin(false);
              setIsPasswordChanged(true);
            }
          });
      } else {
        setIsAdmin(false);
        setIsPasswordChanged(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      // Check if user exists in profiles and get their details
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin, password_changed")
        .eq("email", email)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        toast.error('Error verifying user status');
        return;
      }

      // Check if password needs to be changed
      if (profile && profile.password_changed === false) {
        toast.info('Please set a new password');
        navigate('/change-password');
        return;
      }

      // Navigate based on admin status
      if (profile && profile.is_admin) {
        toast.success('Successfully signed in as admin');
        navigate('/admin/dashboard');
      } else {
        toast.success('Signed in successfully');
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast.error('An error occurred during sign in');
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        return;
      }
      
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('An error occurred during sign out');
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAdmin,
    isPasswordChanged,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
