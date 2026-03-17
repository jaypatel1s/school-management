'use client';

import { Suspense } from 'react';
import { TeachersList } from '@/components/principal/teachers/TeachersList';
import { TeachersListSkeleton } from '@/components/principal/teachers/TeachersListSkeleton';

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-600">Manage all teachers in your college</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Teacher
        </button>
      </div>

      <Suspense fallback={<TeachersListSkeleton />}>
        <TeachersList />
      </Suspense>
    </div>
  );
}
