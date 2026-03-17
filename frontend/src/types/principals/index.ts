// Principal Types

export interface Student {
  id: number;
  user_id: number;
  college_id: number;
  name: string;
  roll_number: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
  user?: any;
  college?: any;
  courses?: any[];
  attendances_count: number;
  book_issues_count: number;
  profile_image?: any;
}

export interface StudentCreateData {
  name: string;
  roll_number: string;
  email: string;
  phone: string;
  address: string;
}

export interface StudentUpdateData extends Partial<StudentCreateData> {}

export interface StudentFilters {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface Teacher {
  id: number;
  user_id: number;
  college_id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  created_at: string;
  updated_at: string;
  user?: any;
  college?: any;
  courses?: any[];
  assignments_count: number;
  profile_image?: any;
}

export interface TeacherCreateData {
  name: string;
  email: string;
  phone: string;
  address: string;
  department: string;
}

export interface TeacherUpdateData extends Partial<TeacherCreateData> {}

export interface TeacherFilters {
  page?: number;
  per_page?: number;
  search?: string;
  department?: string;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
  college_id: number;
  created_at: string;
  updated_at: string;
  college?: any;
  courses_count: number;
  teachers_count: number;
  students_count: number;
}

export interface DepartmentCreateData {
  name: string;
  code: string;
  description: string;
}

export interface DepartmentUpdateData extends Partial<DepartmentCreateData> {}

export interface DepartmentFilters {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface Course {
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

export interface CourseCreateData {
  name: string;
  code: string;
  description: string;
  credits: number;
  department_id: number;
}

export interface CourseUpdateData extends Partial<CourseCreateData> {}

export interface CourseFilters {
  page?: number;
  per_page?: number;
  search?: string;
  department_id?: number;
}

export interface Semester {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  college_id: number;
  created_at: string;
  updated_at: string;
  college?: any;
  courses_count: number;
  students_count: number;
  active: boolean;
  completed: boolean;
}

export interface SemesterCreateData {
  name: string;
  start_date: string;
  end_date: string;
}

export interface SemesterUpdateData extends Partial<SemesterCreateData> {}

export interface SemesterFilters {
  page?: number;
  per_page?: number;
  search?: string;
  start_date?: string;
  end_date?: string;
}

export interface Assignment {
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
}

export interface AssignmentCreateData {
  title: string;
  description: string;
  due_date: string;
  teacher_id: number;
  course_id: number;
}

export interface AssignmentUpdateData extends Partial<AssignmentCreateData> {}

export interface AssignmentFilters {
  page?: number;
  per_page?: number;
  search?: string;
  teacher_id?: number;
  due_date?: string;
}

export interface Exam {
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

export interface ExamCreateData {
  title: string;
  description: string;
  exam_date: string;
  total_marks: number;
  passing_marks: number;
  course_id: number;
}

export interface ExamUpdateData extends Partial<ExamCreateData> {}

export interface ExamFilters {
  page?: number;
  per_page?: number;
  search?: string;
  course_id?: number;
  exam_date?: string;
}

export interface Fee {
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

export interface FeeCreateData {
  student_id: number;
  amount: number;
  due_date: string;
  status: string;
}

export interface FeeUpdateData extends Partial<FeeCreateData> {}

export interface FeeFilters {
  page?: number;
  per_page?: number;
  search?: string;
  student_id?: number;
  status?: string;
  due_date?: string;
}

export interface Admission {
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

export interface AdmissionCreateData {
  student_name: string;
  email: string;
  phone: string;
  course_id: number;
}

export interface AdmissionUpdateData extends Partial<AdmissionCreateData> {
  status?: string;
}

export interface AdmissionFilters {
  page?: number;
  per_page?: number;
  search?: string;
  college_id?: number;
  course_id?: number;
  status?: string;
}

export interface Book {
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

export interface BookCreateData {
  name: string;
  author: string;
  isbn: string;
  category: string;
  total_copies: number;
  published_year: number;
}

export interface BookUpdateData extends Partial<BookCreateData> {}

export interface BookFilters {
  page?: number;
  per_page?: number;
  search?: string;
  author?: string;
  category?: string;
  available_copies?: number;
}

export interface BookIssue {
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

export interface BookIssueCreateData {
  book_id: number;
  student_id: number;
  issue_date?: string;
  due_date?: string;
}

export interface BookIssueUpdateData extends Partial<BookIssueCreateData> {}

export interface BookIssueFilters {
  page?: number;
  per_page?: number;
  search?: string;
  book_id?: number;
  student_id?: number;
  return_date?: string;
}

export interface BookRenewData {
  extra_days?: number;
}

export interface Attendance {
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

export interface AttendanceCreateData {
  student_id: number;
  session_id: number;
  date?: string;
  present: boolean;
  notes?: string;
}

export interface AttendanceUpdateData extends Partial<AttendanceCreateData> {}

export interface AttendanceFilters {
  page?: number;
  per_page?: number;
  search?: string;
  student_id?: number;
  session_id?: number;
  date?: string;
  present?: boolean;
}

export interface BulkAttendanceData {
  attendances: AttendanceCreateData[];
}

export interface PrincipalDashboardStats {
  total_students: number;
  total_teachers: number;
  total_courses: number;
  total_books: number;
  books_issued: number;
}

export interface PrincipalDashboardData {
  stats: PrincipalDashboardStats;
  recent_activities: string[];
}
