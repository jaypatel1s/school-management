import { StudentAPI } from './api';
import { StudentDashboardStats, StudentDashboardData } from '@/types/students';

export const getStudentDashboard = () =>
  StudentAPI.get('/dashboard');

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

export const fetchStudentDashboard = async (): Promise<StudentDashboardData> => {
  const response = await getStudentDashboard();
  return response.data;
};
