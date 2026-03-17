export interface User {
  id: string;
  email: string;
  role: 'principal' | 'teacher' | 'student' | 'super_admin';
  college_id?: string;
  profile_setup: boolean;
  college?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  password_confirmation: string;
  role: 'principal' | 'teacher' | 'student' | 'super_admin';
  college_id?: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
