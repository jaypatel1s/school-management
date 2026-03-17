'use client';

import { Suspense } from 'react';
import { StudentExamDetail } from '@/components/student/exams/StudentExamDetail';
import { StudentExamDetailSkeleton } from '@/components/student/exams/StudentExamDetailSkeleton';

export default function StudentExamDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exam Details</h1>
          <p className="text-gray-600">View exam details and your results</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Back to Exams
        </button>
      </div>

      <Suspense fallback={<StudentExamDetailSkeleton />}>
        <StudentExamDetail examId={params.id} />
      </Suspense>
    </div>
  );
}
