import { PrincipalAPI } from './api';
import { Semester, SemesterCreateData, SemesterUpdateData, SemesterFilters } from '@/types/principals';

// API Functions
export const getSemesters = (params?: SemesterFilters) =>
  PrincipalAPI.get('/semesters', { params });

export const getSemester = (id: string) =>
  PrincipalAPI.get(`/semesters/${id}`);

export const createSemester = (data: SemesterCreateData) =>
  PrincipalAPI.post('/semesters', data);

export const updateSemester = (id: string, data: SemesterUpdateData) =>
  PrincipalAPI.put(`/semesters/${id}`, data);

export const deleteSemester = (id: string) =>
  PrincipalAPI.delete(`/semesters/${id}`);

// Service Functions
export const fetchSemesters = async (filters?: SemesterFilters) => {
  const response = await getSemesters(filters);
  return response.data;
};

export const fetchSemester = async (id: string): Promise<Semester> => {
  const response = await getSemester(id);
  return response.data.semester;
};

export const addSemester = async (data: SemesterCreateData) => {
  const response = await createSemester(data);
  return response.data;
};

export const editSemester = async (id: string, data: SemesterUpdateData) => {
  const response = await updateSemester(id, data);
  return response.data;
};

export const removeSemester = async (id: string) => {
  await deleteSemester(id);
};
