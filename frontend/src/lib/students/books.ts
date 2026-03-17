import { StudentAPI } from './api';
import { StudentBook, StudentBookFilters } from '@/types/students';

// API Functions
export const getStudentBooks = (params?: StudentBookFilters) =>
  StudentAPI.get('/books', { params });

export const getStudentBook = (slug: string) =>
  StudentAPI.get(`/books/${slug}`);

// Service Functions
export const fetchStudentBooks = async (filters?: StudentBookFilters) => {
  const response = await getStudentBooks(filters);
  return response.data;
};

export const fetchStudentBook = async (slug: string): Promise<StudentBook> => {
  const response = await getStudentBook(slug);
  return response.data.book;
};
