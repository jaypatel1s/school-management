import { PrincipalAPI } from './api';
import { Student, StudentCreateData, StudentUpdateData, StudentFilters } from '@/types/principals';

// API Functions
export const getStudents = (params?: StudentFilters) =>
  PrincipalAPI.get('/students', { params });

export const getStudent = (id: string) =>
  PrincipalAPI.get(`/students/${id}`);

export const createStudent = (data: StudentCreateData) =>
  PrincipalAPI.post('/students', data);

export const updateStudent = (id: string, data: StudentUpdateData) =>
  PrincipalAPI.put(`/students/${id}`, data);

export const deleteStudent = (id: string) =>
  PrincipalAPI.delete(`/students/${id}`);

// Service Functions
export const fetchStudents = async (filters?: StudentFilters) => {
  const response = await getStudents(filters);
  return response.data;
};

export const fetchStudent = async (id: string): Promise<Student> => {
  const response = await getStudent(id);
  return response.data.student;
};

export const addStudent = async (data: StudentCreateData) => {
  const response = await createStudent(data);
  return response.data;
};

export const editStudent = async (id: string, data: StudentUpdateData) => {
  const response = await updateStudent(id, data);
  return response.data;
};

export const removeStudent = async (id: string) => {
  await deleteStudent(id);
};
