// Public Types

export interface PublicCollege {
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

export interface PublicCollegeFilters {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface PublicAdmission {
  id: number;
  student_name: string;
  email: string;
  phone: string;
  course_id: number;
  college_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  college?: any;
  course?: any;
  approved: boolean;
  pending: boolean;
  rejected: boolean;
}

export interface PublicAdmissionCreateData {
  student_name: string;
  email: string;
  phone: string;
  course_id: number;
}

export interface PublicAdmissionFilters {
  page?: number;
  per_page?: number;
  search?: string;
  college_id?: number;
  course_id?: number;
  status?: string;
}
