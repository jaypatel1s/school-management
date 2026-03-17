'use client';

import { Suspense } from 'react';
import { TeacherEditForm } from '@/components/principal/teachers/TeacherEditForm';
import { TeacherEditFormSkeleton } from '@/components/principal/teachers/TeacherEditFormSkeleton';

export default function EditTeacherPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Teacher</h1>
          <p className="text-gray-600">Update teacher information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<TeacherEditFormSkeleton />}>
        <TeacherEditForm teacherId={params.id} />
      </Suspense>
    </div>
  );
}
