'use client';

import { Suspense } from 'react';
import { BookIssueDetail } from '@/components/principal/book_issues/BookIssueDetail';
import { BookIssueDetailSkeleton } from '@/components/principal/book_issues/BookIssueDetailSkeleton';

export default function BookIssueDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book Issue Details</h1>
          <p className="text-gray-600">View and manage book issue information</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Return Book
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Renew
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Edit
          </button>
        </div>
      </div>

      <Suspense fallback={<BookIssueDetailSkeleton />}>
        <BookIssueDetail issueId={params.id} />
      </Suspense>
    </div>
  );
}
