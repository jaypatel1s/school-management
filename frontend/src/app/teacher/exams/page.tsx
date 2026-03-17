'use client';

import { Suspense } from 'react';
import { TeacherExamsList } from '@/components/teacher/exams/TeacherExamsList';
import { TeacherExamsListSkeleton } from '@/components/teacher/exams/TeacherExamsListSkeleton';

export default function TeacherExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Exams</h1>
          <p className="text-gray-600">Manage exams for your courses</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create Exam
        </button>
      </div>

      <Suspense fallback={<TeacherExamsListSkeleton />}>
        <TeacherExamsList />
      </Suspense>
    </div>
  );
}
