import { PrincipalAPI } from './api';
import { Course, CourseCreateData, CourseUpdateData, CourseFilters } from '@/types/principals';

// API Functions
export const getCourses = (params?: CourseFilters) =>
  PrincipalAPI.get('/courses', { params });

export const getCourse = (id: string) =>
  PrincipalAPI.get(`/courses/${id}`);

export const createCourse = (data: CourseCreateData) =>
  PrincipalAPI.post('/courses', data);

export const updateCourse = (id: string, data: CourseUpdateData) =>
  PrincipalAPI.put(`/courses/${id}`, data);

export const deleteCourse = (id: string) =>
  PrincipalAPI.delete(`/courses/${id}`);

// Service Functions
export const fetchCourses = async (filters?: CourseFilters) => {
  const response = await getCourses(filters);
  return response.data;
};

export const fetchCourse = async (id: string): Promise<Course> => {
  const response = await getCourse(id);
  return response.data.course;
};

export const addCourse = async (data: CourseCreateData) => {
  const response = await createCourse(data);
  return response.data;
};

export const editCourse = async (id: string, data: CourseUpdateData) => {
  const response = await updateCourse(id, data);
  return response.data;
};

export const removeCourse = async (id: string) => {
  await deleteCourse(id);
};
