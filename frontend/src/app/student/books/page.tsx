'use client';

import { Suspense } from 'react';
import { StudentBooksList } from '@/components/student/books/StudentBooksList';
import { StudentBooksListSkeleton } from '@/components/student/books/StudentBooksListSkeleton';

export default function StudentBooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Library Books</h1>
          <p className="text-gray-600">Browse and search library books</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Search Books
        </button>
      </div>

      <Suspense fallback={<StudentBooksListSkeleton />}>
        <StudentBooksList />
      </Suspense>
    </div>
  );
}
