'use client';

import { Suspense } from 'react';
import { StudentEditForm } from '@/components/principal/students/StudentEditForm';
import { StudentEditFormSkeleton } from '@/components/principal/students/StudentEditFormSkeleton';

export default function EditStudentPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Student</h1>
          <p className="text-gray-600">Update student information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<StudentEditFormSkeleton />}>
        <StudentEditForm studentId={params.id} />
      </Suspense>
    </div>
  );
}
