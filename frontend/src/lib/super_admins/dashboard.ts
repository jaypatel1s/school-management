import { SuperAdminAPI } from './api';
import { SuperAdminDashboardStats, SuperAdminDashboardData } from '@/types/super_admins';

export const getSuperAdminDashboard = () =>
  SuperAdminAPI.get('/dashboard');

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

export const fetchSuperAdminDashboard = async (): Promise<SuperAdminDashboardData> => {
  const response = await getSuperAdminDashboard();
  return response.data;
};
