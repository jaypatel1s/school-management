import { StudentAPI } from './api';
import { StudentAttendance, StudentAttendanceFilters } from '@/types/students';

// API Functions
export const getStudentAttendances = (params?: StudentAttendanceFilters) =>
  StudentAPI.get('/attendances', { params });

export const getStudentAttendance = (id: string) =>
  StudentAPI.get(`/attendances/${id}`);

export const getStudentAttendanceReport = (params?: StudentAttendanceFilters) =>
  StudentAPI.get('/attendances/report', { params });

// Service Functions
export const fetchStudentAttendances = async (filters?: StudentAttendanceFilters) => {
  const response = await getStudentAttendances(filters);
  return response.data;
};

export const fetchStudentAttendance = async (id: string): Promise<StudentAttendance> => {
  const response = await getStudentAttendance(id);
  return response.data.attendance;
};

export const fetchStudentAttendanceReport = async (params?: any) => {
  const response = await getStudentAttendanceReport(params);
  return response.data;
};
