import { TeacherAPI } from './api';
import { TeacherAttendance, TeacherAttendanceCreateData, TeacherAttendanceUpdateData, TeacherAttendanceFilters, BulkAttendanceData } from '@/types/teachers';

// API Functions
export const getTeacherAttendances = (params?: TeacherAttendanceFilters) =>
  TeacherAPI.get('/attendances', { params });

export const getTeacherAttendance = (id: string) =>
  TeacherAPI.get(`/attendances/${id}`);

export const createTeacherAttendance = (data: TeacherAttendanceCreateData) =>
  TeacherAPI.post('/attendances', data);

export const updateTeacherAttendance = (id: string, data: TeacherAttendanceUpdateData) =>
  TeacherAPI.put(`/attendances/${id}`, data);

export const deleteTeacherAttendance = (id: string) =>
  TeacherAPI.delete(`/attendances/${id}`);

export const bulkMarkAttendance = (data: BulkAttendanceData) =>
  TeacherAPI.post('/attendances/bulk_mark', data);

// Service Functions
export const fetchTeacherAttendances = async (filters?: TeacherAttendanceFilters) => {
  const response = await getTeacherAttendances(filters);
  return response.data;
};

export const fetchTeacherAttendance = async (id: string): Promise<TeacherAttendance> => {
  const response = await getTeacherAttendance(id);
  return response.data.attendance;
};

export const addTeacherAttendance = async (data: TeacherAttendanceCreateData) => {
  const response = await createTeacherAttendance(data);
  return response.data;
};

export const editTeacherAttendance = async (id: string, data: TeacherAttendanceUpdateData) => {
  const response = await updateTeacherAttendance(id, data);
  return response.data;
};

export const removeTeacherAttendance = async (id: string) => {
  await deleteTeacherAttendance(id);
};

export const bulkMarkTeacherAttendance = async (data: BulkAttendanceData) => {
  const response = await bulkMarkAttendance(data);
  return response.data;
};
