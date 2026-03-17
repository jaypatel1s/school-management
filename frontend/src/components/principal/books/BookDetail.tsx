'use client';

import { fetchBook } from '@/lib/principals/books';
import { BookInfo } from './BookInfo';

interface BookDetailProps {
  bookId: string;
}

export async function BookDetail({ bookId }: BookDetailProps) {
  const book = await fetchBook(bookId);

  return (
    <div className="space-y-6">
      <BookInfo book={book} />
    </div>
  );
}
