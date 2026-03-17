import { PrincipalAPI } from './api';
import { Exam, ExamCreateData, ExamUpdateData, ExamFilters } from '@/types/principals';

// API Functions
export const getExams = (params?: ExamFilters) =>
  PrincipalAPI.get('/exams', { params });

export const getExam = (id: string) =>
  PrincipalAPI.get(`/exams/${id}`);

export const createExam = (data: ExamCreateData) =>
  PrincipalAPI.post('/exams', data);

export const updateExam = (id: string, data: ExamUpdateData) =>
  PrincipalAPI.put(`/exams/${id}`, data);

export const deleteExam = (id: string) =>
  PrincipalAPI.delete(`/exams/${id}`);

// Service Functions
export const fetchExams = async (filters?: ExamFilters) => {
  const response = await getExams(filters);
  return response.data;
};

export const fetchExam = async (id: string): Promise<Exam> => {
  const response = await getExam(id);
  return response.data.exam;
};

export const addExam = async (data: ExamCreateData) => {
  const response = await createExam(data);
  return response.data;
};

export const editExam = async (id: string, data: ExamUpdateData) => {
  const response = await updateExam(id, data);
  return response.data;
};

export const removeExam = async (id: string) => {
  await deleteExam(id);
};
