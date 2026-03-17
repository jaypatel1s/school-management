import { PrincipalAPI } from './api';
import { Teacher, TeacherCreateData, TeacherUpdateData, TeacherFilters } from '@/types/principals';

// API Functions
export const getTeachers = (params?: TeacherFilters) =>
  PrincipalAPI.get('/teachers', { params });

export const getTeacher = (id: string) =>
  PrincipalAPI.get(`/teachers/${id}`);

export const createTeacher = (data: TeacherCreateData) =>
  PrincipalAPI.post('/teachers', data);

export const updateTeacher = (id: string, data: TeacherUpdateData) =>
  PrincipalAPI.put(`/teachers/${id}`, data);

export const deleteTeacher = (id: string) =>
  PrincipalAPI.delete(`/teachers/${id}`);

// Service Functions
export const fetchTeachers = async (filters?: TeacherFilters) => {
  const response = await getTeachers(filters);
  return response.data;
};

export const fetchTeacher = async (id: string): Promise<Teacher> => {
  const response = await getTeacher(id);
  return response.data.teacher;
};

export const addTeacher = async (data: TeacherCreateData) => {
  const response = await createTeacher(data);
  return response.data;
};

export const editTeacher = async (id: string, data: TeacherUpdateData) => {
  const response = await updateTeacher(id, data);
  return response.data;
};

export const removeTeacher = async (id: string) => {
  await deleteTeacher(id);
};
