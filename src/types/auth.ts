
export type UserRole = 'owner' | 'inspector' | 'admin';

export interface User {
  id: string;
  email: string;
  name?: string;
  full_name?: string;  
  role: UserRole;
  position?: string;
  date_joined?: string;
  status?: string;
  duty_status?: boolean;
  availability_period?: {
    start?: string;
    end?: string;
  };
  // Added new fields from our SQL migration
  is_admin?: boolean;
  password_changed?: boolean;
  email_verified?: boolean;
  email_confirmed_at?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (email: string, password: string, fullName: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  updateUser?: (user: User) => Promise<void>;
}
