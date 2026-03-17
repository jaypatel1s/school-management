'use client';

import { Suspense } from 'react';
import { StudentBookIssuesList } from '@/components/student/book_issues/StudentBookIssuesList';
import { StudentBookIssuesListSkeleton } from '@/components/student/book_issues/StudentBookIssuesListSkeleton';

export default function StudentBookIssuesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Book Issues</h1>
          <p className="text-gray-600">View your borrowed books and due dates</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Browse Books
        </button>
      </div>

      <Suspense fallback={<StudentBookIssuesListSkeleton />}>
        <StudentBookIssuesList />
      </Suspense>
    </div>
  );
}
