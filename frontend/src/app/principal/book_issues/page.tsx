'use client';

import { Suspense } from 'react';
import { BookIssuesList } from '@/components/principal/book_issues/BookIssuesList';
import { BookIssuesListSkeleton } from '@/components/principal/book_issues/BookIssuesListSkeleton';

export default function BookIssuesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book Issues</h1>
          <p className="text-gray-600">Manage all book issues and returns</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Issue Book
        </button>
      </div>

      <Suspense fallback={<BookIssuesListSkeleton />}>
        <BookIssuesList />
      </Suspense>
    </div>
  );
}
