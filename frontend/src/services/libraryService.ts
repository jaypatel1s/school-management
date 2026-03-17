import api from '@/lib/api';
import { Book, BookIssue, CreateBookData, CreateBookIssueData } from '@/types';

export const libraryService = {
  // Books
  async getBooks(): Promise<{ books: Book[] }> {
    const response = await api.get('/books');
    return response.data;
  },

  async getBook(slug: string): Promise<{ book: Book }> {
    const response = await api.get(`/books/${slug}`);
    return response.data;
  },

  async createBook(bookData: CreateBookData): Promise<{ book: Book }> {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  async updateBook(slug: string, bookData: Partial<CreateBookData>): Promise<{ book: Book }> {
    const response = await api.put(`/books/${slug}`, bookData);
    return response.data;
  },

  async deleteBook(slug: string): Promise<void> {
    await api.delete(`/books/${slug}`);
  },

  async issueBook(slug: string, studentId: string): Promise<{ message: string }> {
    const response = await api.post(`/books/${slug}/issue`, { student_id: studentId });
    return response.data;
  },

  // Book Issues
  async getBookIssues(): Promise<{ book_issues: BookIssue[] }> {
    const response = await api.get('/book_issues');
    return response.data;
  },

  async getBookIssue(id: string): Promise<{ book_issue: BookIssue }> {
    const response = await api.get(`/book_issues/${id}`);
    return response.data;
  },

  async createBookIssue(bookIssueData: CreateBookIssueData): Promise<{ book_issue: BookIssue }> {
    const response = await api.post('/book_issues', bookIssueData);
    return response.data;
  },

  async updateBookIssue(id: string, bookIssueData: Partial<CreateBookIssueData>): Promise<{ book_issue: BookIssue }> {
    const response = await api.put(`/book_issues/${id}`, bookIssueData);
    return response.data;
  },

  async deleteBookIssue(id: string): Promise<void> {
    await api.delete(`/book_issues/${id}`);
  },

  async returnBook(id: string): Promise<{ book_issue: BookIssue }> {
    const response = await api.post(`/book_issues/${id}/return_book`);
    return response.data;
  },

  async renewBook(id: string, extraDays: number = 7): Promise<{ book_issue: BookIssue }> {
    const response = await api.post(`/book_issues/${id}/renew`, { extra_days: extraDays });
    return response.data;
  },
};
