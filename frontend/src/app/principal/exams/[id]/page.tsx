'use client';

import { Suspense } from 'react';
import { ExamDetail } from '@/components/principal/exams/ExamDetail';
import { ExamDetailSkeleton } from '@/components/principal/exams/ExamDetailSkeleton';

export default function ExamDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exam Details</h1>
          <p className="text-gray-600">View and manage exam information</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Edit
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>

      <Suspense fallback={<ExamDetailSkeleton />}>
        <ExamDetail examId={params.id} />
      </Suspense>
    </div>
  );
}
