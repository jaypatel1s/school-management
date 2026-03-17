export interface Book {
  id: string;
  name: string;
  author: string;
  isbn?: string;
  category?: string;
  total_copies: number;
  available_copies: number;
  published_year?: number;
  slug: string;
  book_issues?: BookIssue[];
}

export interface BookIssue {
  id: string;
  book_id: string;
  student_id: string;
  issue_date: string;
  due_date: string;
  return_date?: string;
  book?: Book;
  student?: Student;
  fine?: Fine;
}

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface Fine {
  id: string;
  amount: number;
  reason: string;
  created_at: string;
}

export interface CreateBookData {
  name: string;
  author: string;
  isbn?: string;
  category?: string;
  total_copies: number;
  published_year?: number;
}

export interface CreateBookIssueData {
  book_id: string;
  student_id: string;
  issue_date: string;
  due_date: string;
}
