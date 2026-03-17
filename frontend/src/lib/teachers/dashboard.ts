import { TeacherAPI } from './api';
import { TeacherDashboardStats, TeacherDashboardData } from '@/types/teachers';

export const getTeacherDashboard = () =>
  TeacherAPI.get('/dashboard');

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

export const fetchTeacherDashboard = async (): Promise<TeacherDashboardData> => {
  const response = await getTeacherDashboard();
  return response.data;
};
