import { TeacherAPI } from './api';
import { TeacherStudent, TeacherStudentFilters } from '@/types/teachers';

// API Functions
export const getTeacherStudents = (params?: TeacherStudentFilters) =>
  TeacherAPI.get('/students', { params });

export const getTeacherStudent = (id: string) =>
  TeacherAPI.get(`/students/${id}`);

// Service Functions
export const fetchTeacherStudents = async (filters?: TeacherStudentFilters) => {
  const response = await getTeacherStudents(filters);
  return response.data;
};

export const fetchTeacherStudent = async (id: string): Promise<TeacherStudent> => {
  const response = await getTeacherStudent(id);
  return response.data.student;
};
