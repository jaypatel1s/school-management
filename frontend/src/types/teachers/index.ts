// Teacher Types

export interface TeacherCourse {
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

export interface TeacherCourseFilters {
  page?: number;
  per_page?: number;
  search?: string;
  department_id?: number;
}

export interface TeacherAssignment {
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

export interface TeacherAssignmentCreateData {
  title: string;
  description: string;
  due_date: string;
  course_id: number;
}

export interface TeacherAssignmentUpdateData extends Partial<TeacherAssignmentCreateData> {}

export interface TeacherAssignmentFilters {
  page?: number;
  per_page?: number;
  search?: string;
  due_date?: string;
}

export interface TeacherAttendance {
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

export interface TeacherAttendanceCreateData {
  student_id: number;
  session_id: number;
  date?: string;
  present: boolean;
  notes?: string;
}

export interface TeacherAttendanceUpdateData extends Partial<TeacherAttendanceCreateData> {}

export interface TeacherAttendanceFilters {
  page?: number;
  per_page?: number;
  search?: string;
  date?: string;
  present?: boolean;
}

export interface BulkAttendanceData {
  attendances: TeacherAttendanceCreateData[];
}

export interface TeacherExam {
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

export interface TeacherExamCreateData {
  title: string;
  description: string;
  exam_date: string;
  total_marks: number;
  passing_marks: number;
  course_id: number;
}

export interface TeacherExamUpdateData extends Partial<TeacherExamCreateData> {}

export interface TeacherExamFilters {
  page?: number;
  per_page?: number;
  search?: string;
  exam_date?: string;
}

export interface TeacherStudent {
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

export interface TeacherStudentFilters {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface TeacherDashboardStats {
  my_courses: number;
  my_assignments: number;
  my_students: number;
  pending_submissions: number;
  today_classes: number;
}

export interface TeacherDashboardData {
  stats: TeacherDashboardStats;
  recent_activities: string[];
}
