'use client';

import { Suspense } from 'react';
import { TeacherStudentsList } from '@/components/teacher/students/TeacherStudentsList';
import { TeacherStudentsListSkeleton } from '@/components/teacher/students/TeacherStudentsListSkeleton';

export default function TeacherStudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Students</h1>
          <p className="text-gray-600">View students enrolled in your courses</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Export List
        </button>
      </div>

      <Suspense fallback={<TeacherStudentsListSkeleton />}>
        <TeacherStudentsList />
      </Suspense>
    </div>
  );
}
