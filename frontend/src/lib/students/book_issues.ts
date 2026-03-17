import { StudentAPI } from './api';
import { StudentBookIssue, StudentBookIssueFilters } from '@/types/students';

// API Functions
export const getStudentBookIssues = (params?: StudentBookIssueFilters) =>
  StudentAPI.get('/book_issues', { params });

export const getStudentBookIssue = (id: string) =>
  StudentAPI.get(`/book_issues/${id}`);

// Service Functions
export const fetchStudentBookIssues = async (filters?: StudentBookIssueFilters) => {
  const response = await getStudentBookIssues(filters);
  return response.data;
};

export const fetchStudentBookIssue = async (id: string): Promise<StudentBookIssue> => {
  const response = await getStudentBookIssue(id);
  return response.data.book_issue;
};
