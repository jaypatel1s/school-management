'use client';

import { Suspense } from 'react';
import { ExamsList } from '@/components/principal/exams/ExamsList';
import { ExamsListSkeleton } from '@/components/principal/exams/ExamsListSkeleton';

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exams</h1>
          <p className="text-gray-600">Manage all exams in your college</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Exam
        </button>
      </div>

      <Suspense fallback={<ExamsListSkeleton />}>
        <ExamsList />
      </Suspense>
    </div>
  );
}
