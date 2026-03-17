'use client';

import { Suspense } from 'react';
import { StudentExamsList } from '@/components/student/exams/StudentExamsList';
import { StudentExamsListSkeleton } from '@/components/student/exams/StudentExamsListSkeleton';

export default function StudentExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Exams</h1>
          <p className="text-gray-600">View your exam schedule and results</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          View Calendar
        </button>
      </div>

      <Suspense fallback={<StudentExamsListSkeleton />}>
        <StudentExamsList />
      </Suspense>
    </div>
  );
}
