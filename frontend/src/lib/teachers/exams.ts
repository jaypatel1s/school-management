import { TeacherAPI } from './api';
import { TeacherExam, TeacherExamCreateData, TeacherExamUpdateData, TeacherExamFilters } from '@/types/teachers';

// API Functions
export const getTeacherExams = (params?: TeacherExamFilters) =
  TeacherAPI.get('/exams', { params });

export const getTeacherExam = (id: string) =
  TeacherAPI.get(`/exams/${id}`);

export const createTeacherExam = (data: TeacherExamCreateData) =
  TeacherAPI.post('/exams', data);

export const updateTeacherExam = (id: string, data: TeacherExamUpdateData) =
  TeacherAPI.put(`/exams/${id}`, data);

export const deleteTeacherExam = (id: string) =
  TeacherAPI.delete (`/exams/${id}`);

// Service Functions
export const fetchTeacherExams = async (filters?: TeacherExamFilters) => {
  const response = await getTeacherExams(filters);
  return response.data;
};

export const fetchTeacherExam = async (id: string): Promise<TeacherExam> => {
  const response = await getTeacherExam(id);
  return response.data.exam;
};

export const addTeacherExam = async (data: TeacherExamCreateData) => {
  const response = await createTeacherExam(data);
  return response.data;
};

export const editTeacherExam = async (id: string, data: TeacherExamUpdateData) => {
  const response = await updateTeacherExam(id, data);
  return response.data;
};

export const removeTeacherExam = async (id: string) => {
  await deleteTeacherExam(id);
};
