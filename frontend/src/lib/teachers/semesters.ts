import { TeacherAPI } from './api';
import { TeacherCourse, TeacherCourseFilters } from '@/types/teachers';

export const getTeacherCourses = (params?: TeacherCourseFilters) =>
  TeacherAPI.get('/courses', { params });

export const getTeacherCourse = (id: string) =>
  TeacherAPI.get(`/courses/${id}`);

export const updateTeacherCourse = (id: string, data: TeacherCourse) =>
  TeacherAPI.put(`/courses/${id}`, data);

export const fetchTeacherCourses = async (filters?: TeacherCourseFilters) => {
  const response = await getTeacherCourses(filters);
  return response.data;
};

export const fetchTeacherCourse = async (id: string): Promise<TeacherCourse> => {
  const response = await getTeacherCourses({ id });
  return response.data.courses[0];
};
