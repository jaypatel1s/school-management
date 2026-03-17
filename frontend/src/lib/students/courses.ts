import { StudentAPI } from './api';
import { StudentCourse, StudentCourseFilters } from '@/types/students';

// API Functions
export const getStudentCourses = (params?: StudentCourseFilters) =>
  StudentAPI.get('/courses', { params });

export const getStudentCourse = (id: string) =>
  StudentAPI.get(`/courses/${id}`);

// Service Functions
export const fetchStudentCourses = async (filters?: StudentCourseFilters) => {
  const response = await getStudentCourses(filters);
  return response.data;
};

export const fetchStudentCourse = async (id: string): Promise<StudentCourse> => {
  const response = await getStudentCourse(id);
  return response.data.course;
};
