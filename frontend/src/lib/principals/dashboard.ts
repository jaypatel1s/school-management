import { PrincipalAPI } from './api';

export const getPrincipalDashboard = () =>
  PrincipalAPI.get('/dashboard');

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

export const fetchPrincipalDashboard = async (): Promise<PrincipalDashboardData> => {
  const response = await getPrincipalDashboard();
  return response.data;
};
