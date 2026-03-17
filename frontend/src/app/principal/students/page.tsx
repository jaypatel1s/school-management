'use client';

import { Suspense } from 'react';
import { StudentsList } from '@/components/principal/students/StudentsList';
import { StudentsListSkeleton } from '@/components/principal/students/StudentsListSkeleton';

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600">Manage all students in your college</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Student
        </button>
      </div>

      <Suspense fallback={<StudentsListSkeleton />}>
        <StudentsList />
      </Suspense>
    </div>
  );
}
