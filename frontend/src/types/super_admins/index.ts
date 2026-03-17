// Super Admin Types

export interface SuperAdminCollege {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  users_count: number;
  students_count: number;
  teachers_count: number;
  courses_count: number;
  books_count: number;
}

export interface SuperAdminCollegeCreateData {
  name: string;
  slug: string;
}

export interface SuperAdminCollegeUpdateData extends Partial<SuperAdminCollegeCreateData> {}

export interface SuperAdminCollegeFilters {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface SuperAdminUser {
  id: number;
  email: string;
  role: string;
  college_id: number;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  college?: any;
  student?: any;
  teacher?: any;
}

export interface SuperAdminUserCreateData {
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
  college_id: number;
  first_name: string;
  last_name: string;
}

export interface SuperAdminUserUpdateData extends Partial<SuperAdminUserCreateData> {}

export interface SuperAdminUserFilters {
  page?: number;
  per_page?: number;
  search?: string;
  role?: string;
  college_id?: number;
}

export interface SuperAdminDashboardStats {
  total_colleges: number;
  total_users: number;
  total_students: number;
  total_teachers: number;
  total_books: number;
  active_sessions: number;
}

export interface SuperAdminDashboardData {
  stats: SuperAdminDashboardStats;
  recent_activities: string[];
}
