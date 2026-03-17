'use client';

import { Suspense } from 'react';
import { TeacherAssignmentEditForm } from '@/components/teacher/assignments/TeacherAssignmentEditForm';
import { TeacherAssignmentEditFormSkeleton } from '@/components/teacher/assignments/TeacherAssignmentEditFormSkeleton';

export default function EditTeacherAssignmentPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Assignment</h1>
          <p className="text-gray-600">Update assignment information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<TeacherAssignmentEditFormSkeleton />}>
        <TeacherAssignmentEditForm assignmentId={params.id} />
      </Suspense>
    </div>
  );
}
