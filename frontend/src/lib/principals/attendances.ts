import { PrincipalAPI } from './api';
import { Attendance, AttendanceCreateData, AttendanceUpdateData, AttendanceFilters, BulkAttendanceData } from '@/types/principals';

// API Functions
export const getAttendances = (params?: AttendanceFilters) =>
  PrincipalAPI.get('/attendances', { params });

export const getAttendance = (id: string) =>
  PrincipalAPI.get(`/attendances/${id}`);

export const createAttendance = (data: AttendanceCreateData) =>
  PrincipalAPI.post('/attendances', data);

export const updateAttendance = (id: string, data: AttendanceUpdateData) =>
  PrincipalAPI.put(`/attendances/${id}`, data);

export const deleteAttendance = (id: string) =>
  PrincipalAPI.delete(`/attendances/${id}`);

export const getAttendanceReport = (params?: AttendanceFilters) =>
  PrincipalAPI.get('/attendances/report', { params });

// Service Functions
export const fetchAttendances = async (filters?: AttendanceFilters) => {
  const response = await getAttendances(filters);
  return response.data;
};

export const fetchAttendance = async (id: string): Promise<Attendance> => {
  const response = await getAttendance(id);
  return response.data.attendance;
};

export const addAttendance = async (data: AttendanceCreateData) => {
  const response = await createAttendance(data);
  return response.data;
};

export const editAttendance = async (id: string, data: AttendanceUpdateData) => {
  const response = await updateAttendance(id, data);
  return response.data;
};

export const removeAttendance = async (id: string) => {
  await deleteAttendance(id);
};

export const fetchAttendanceReport = async (params?: any) => {
  const response = await getAttendanceReport(params);
  return response.data;
};
