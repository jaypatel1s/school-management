'use client';

import { fetchStudentBook } from '@/lib/students/books';
import { StudentBookInfo } from './StudentBookInfo';

interface StudentBookDetailProps {
  bookSlug: string;
}

export async function StudentBookDetail({ bookSlug }: StudentBookDetailProps) {
  const book = await fetchStudentBook(bookSlug);

  return (
    <div className="space-y-6">
      <StudentBookInfo book={book} />
    </div>
  );
}
