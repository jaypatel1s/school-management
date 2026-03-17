// Student Types

export interface StudentCourse {
  id: number;
  name: string;
  code: string;
  description: string;
  credits: number;
  department_id: number;
  college_id: number;
  created_at: string;
  updated_at: string;
  college?: any;
  department?: any;
  students_count: number;
  teachers_count: number;
  sessions_count: number;
}

export interface StudentCourseFilters {
  page?: number;
  per_page?: number;
  search?: string;
  department_id?: number;
}

export interface StudentAttendance {
  id: number;
  student_id: number;
  session_id: number;
  college_id: number;
  date: string;
  present: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
  college?: any;
  student?: any;
  session?: any;
  status: string;
}

export interface StudentAttendanceFilters {
  page?: number;
  per_page?: number;
  search?: string;
  date?: string;
  present?: boolean;
}

export interface StudentFee {
  id: number;
  student_id: number;
  amount: number;
  due_date: string;
  paid_date: string;
  status: string;
  college_id: number;
  created_at: string;
  updated_at: string;
  college?: any;
  student?: any;
  paid: boolean;
  overdue: boolean;
  overdue_days: number;
}

export interface StudentFeeFilters {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
  due_date?: string;
}

export interface StudentAssignment {
  id: number;
  title: string;
  description: string;
  due_date: string;
  teacher_id: number;
  college_id: number;
  created_at: string;
  updated_at: string;
  teacher?: any;
  submissions_count: number;
  pending_submissions_count: number;
  submitted_count: number;
  overdue: boolean;
  submitted: boolean;
}

export interface StudentAssignmentFilters {
  page?: number;
  per_page?: number;
  search?: string;
  due_date?: string;
}

export interface StudentExam {
  id: number;
  title: string;
  description: string;
  exam_date: string;
  total_marks: number;
  passing_marks: number;
  course_id: number;
  college_id: number;
  created_at: string;
  updated_at: string;
  college?: any;
  course?: any;
  results_count: number;
  passed_count: number;
  failed_count: number;
  completed: boolean;
}

export interface StudentExamFilters {
  page?: number;
  per_page?: number;
  search?: string;
  exam_date?: string;
}

export interface StudentBook {
  id: number;
  name: string;
  author: string;
  isbn: string;
  category: string;
  total_copies: number;
  available_copies: number;
  published_year: number;
  slug: string;
  created_at: string;
  updated_at: string;
  available: boolean;
  issued_copies: number;
  book_issues?: any[];
  cover_image?: any;
}

export interface StudentBookFilters {
  page?: number;
  per_page?: number;
  search?: string;
  author?: string;
  category?: string;
  available_copies?: number;
}

export interface StudentBookIssue {
  id: number;
  book_id: number;
  student_id: number;
  college_id: number;
  issue_date: string;
  due_date: string;
  return_date: string;
  created_at: string;
  updated_at: string;
  returned: boolean;
  overdue_days: number;
  overdue: boolean;
  book?: any;
  student?: any;
  fine?: any;
  can_renew: boolean;
}

export interface StudentBookIssueFilters {
  page?: number;
  per_page?: number;
  search?: string;
  return_date?: string;
}

export interface StudentDashboardStats {
  my_courses: number;
  my_attendance: number;
  my_books: number;
  pending_fees: number;
}

export interface StudentDashboardData {
  stats: StudentDashboardStats;
  recent_activities: string[];
}
