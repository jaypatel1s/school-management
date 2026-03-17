'use client';

import { Suspense } from 'react';
import { TeacherExamEditForm } from '@/components/teacher/exams/TeacherExamEditForm';
import { TeacherExamEditFormSkeleton } from '@/components/teacher/exams/TeacherExamEditFormSkeleton';

export default function EditTeacherExamPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Exam</h1>
          <p className="text-gray-600">Update exam information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<TeacherExamEditFormSkeleton />}>
        <TeacherExamEditForm examId={params.id} />
      </Suspense>
    </div>
  );
}
