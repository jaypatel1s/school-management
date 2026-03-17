'use client';

import { Suspense } from 'react';
import { BooksList } from '@/components/principal/books/BooksList';
import { BooksListSkeleton } from '@/components/principal/books/BooksListSkeleton';

export default function BooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Library Books</h1>
          <p className="text-gray-600">Manage all books in the library</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Book
        </button>
      </div>

      <Suspense fallback={<BooksListSkeleton />}>
        <BooksList />
      </Suspense>
    </div>
  );
}
