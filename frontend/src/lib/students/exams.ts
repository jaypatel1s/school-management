import { StudentAPI } from './api';
import { StudentExam, StudentExamFilters } from '@/types/students';

// API Functions
export const getStudentExams = (params?: StudentExamFilters) =>
  StudentAPI.get('/exams', { params });

export const getStudentExam = (id: string) =>
  StudentAPI.get(`/exams/${id}`);

// Service Functions
export const fetchStudentExams = async (filters?: StudentExamFilters) => {
  const response = await getStudentExams(filters);
  return response.data;
};

export const fetchStudentExam = async (id: string): Promise<StudentExam> => {
  const response = await getStudentExam(id);
  return response.data.exam;
};
