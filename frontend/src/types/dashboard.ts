export interface DashboardStats {
  total_students?: number;
  total_teachers?: number;
  total_courses?: number;
  total_books?: number;
  books_issued?: number;
  my_courses?: number;
  my_sessions?: number;
  my_attendance?: number;
  my_books?: number;
  pending_fees?: number;
  total_colleges?: number;
  total_users?: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recent_activities: string[];
}
