import { TeacherAPI } from './api';
import { TeacherAssignment, TeacherAssignmentCreateData, TeacherAssignmentUpdateData, TeacherAssignmentFilters } from '@/types/teachers';

// API Functions
export const getTeacherAssignments = (params?: TeacherAssignmentFilters) =>
  TeacherAPI.get('/assignments', { params });

export const getTeacherAssignment = (id: string) =>
  TeacherAPI.get(`/assignments/${id}`);

export const createTeacherAssignment = (data: TeacherAssignmentCreateData) =>
  TeacherAPI.post('/assignments', data);

export const updateTeacherAssignment = (id: string, data: TeacherAssignmentUpdateData) =>
  TeacherAPI.put(`/assignments/${id}`, data);

export const deleteTeacherAssignment = (id: string) =>
  TeacherAPI.delete(`/assignments/${id}`);

// Service Functions
export const fetchTeacherAssignments = async (filters?: TeacherAssignmentFilters) => {
  const response = await getTeacherAssignments(filters);
  return response.data;
};

export const fetchTeacherAssignment = async (id: string): Promise<TeacherAssignment> => {
  const response = await getTeacherAssignment(id);
  return response.data.assignment;
};

export const addTeacherAssignment = async (data: TeacherAssignmentCreateData) => {
  const response = await createTeacherAssignment(data);
  return response.data;
};

export const editTeacherAssignment = async (id: string, data: TeacherAssignmentUpdateData) => {
  const response = await updateTeacherAssignment(id, data);
  return response.data;
};

export const removeTeacherAssignment = async (id: string) => {
  await deleteTeacherAssignment(id);
};
