import { PrincipalAPI } from './api';
import { BookIssue, BookIssueCreateData, BookIssueUpdateData, BookIssueFilters, BookRenewData } from '@/types/principals';

// API Functions
export const getBookIssues = (params?: BookIssueFilters) =>
  PrincipalAPI.get('/book_issues', { params });

export const getBookIssue = (id: string) =>
  PrincipalAPI.get(`/book_issues/${id}`);

export const createBookIssue = (data: BookIssueCreateData) =>
  PrincipalAPI.post('/book_issues', data);

export const updateBookIssue = (id: string, data: BookIssueUpdateData) =>
  PrincipalAPI.put(`/book_issues/${id}`, data);

export const deleteBookIssue = (id: string) =>
  PrincipalAPI.delete(`/book_issues/${id}`);

export const returnBook = (id: string) =>
  PrincipalAPI.post(`/book_issues/${id}/return_book`);

export const renewBook = (id: string, data?: BookRenewData) =>
  PrincipalAPI.post(`/book_issues/${id}/renew`, data);

// Service Functions
export const fetchBookIssues = async (filters?: BookIssueFilters) => {
  const response = await getBookIssues(filters);
  return response.data;
};

export const fetchBookIssue = async (id: string): Promise<BookIssue> => {
  const response = await getBookIssue(id);
  return response.data.book_issue;
};

export const addBookIssue = async (data: BookIssueCreateData) => {
  const response = await createBookIssue(data);
  return response.data;
};

export const editBookIssue = async (id: string, data: BookIssueUpdateData) => {
  const response = await updateBookIssue(id, data);
  return response.data;
};

export const removeBookIssue = async (id: string) => {
  await deleteBookIssue(id);
};

export const returnIssuedBook = async (id: string) => {
  const response = await returnBook(id);
  return response.data;
};

export const renewIssuedBook = async (id: string, data?: BookRenewData) => {
  const response = await renewBook(id, data);
  return response.data;
};
