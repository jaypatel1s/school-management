import { PrincipalAPI } from './api';
import { Book, BookCreateData, BookUpdateData, BookFilters, BookIssueData } from '@/types/principals';

// API Functions
export const getBooks = (params?: BookFilters) =>
  PrincipalAPI.get('/books', { params });

export const getBook = (slug: string) =>
  PrincipalAPI.get(`/books/${slug}`);

export const createBook = (data: BookCreateData) =>
  PrincipalAPI.post('/books', data);

export const updateBook = (slug: string, data: BookUpdateData) =>
  PrincipalAPI.put(`/books/${slug}`, data);

export const deleteBook = (slug: string) =>
  PrincipalAPI.delete(`/books/${slug}`);

export const issueBook = (slug: string, data: BookIssueData) =>
  PrincipalAPI.post(`/books/${slug}/issue`, data);

// Service Functions
export const fetchBooks = async (filters?: BookFilters) => {
  const response = await getBooks(filters);
  return response.data;
};

export const fetchBook = async (slug: string): Promise<Book> => {
  const response = await getBook(slug);
  return response.data.book;
};

export const addBook = async (data: BookCreateData) => {
  const response = await createBook(data);
  return response.data;
};

export const editBook = async (slug: string, data: BookUpdateData) => {
  const response = await updateBook(slug, data);
  return response.data;
};

export const removeBook = async (slug: string) => {
  await deleteBook(slug);
};

export const issueBookToStudent = async (slug: string, data: BookIssueData) => {
  const response = await issueBook(slug, data);
  return response.data;
};
