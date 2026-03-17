'use client';

import { Suspense } from 'react';
import { BookIssueEditForm } from '@/components/principal/book_issues/BookIssueEditForm';
import { BookIssueEditFormSkeleton } from '@/components/principal/book_issues/BookIssueEditFormSkeleton';

export default function EditBookIssuePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Book Issue</h1>
          <p className="text-gray-600">Update book issue information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<BookIssueEditFormSkeleton />}>
        <BookIssueEditForm issueId={params.id} />
      </Suspense>
    </div>
  );
}
