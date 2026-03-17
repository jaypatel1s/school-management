'use client';

import { Suspense } from 'react';
import { AssignmentEditForm } from '@/components/principal/assignments/AssignmentEditForm';
import { AssignmentEditFormSkeleton } from '@/components/principal/assignments/AssignmentEditFormSkeleton';

export default function EditAssignmentPage({ params }: { params: { id: string } }) {
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

      <Suspense fallback={<AssignmentEditFormSkeleton />}>
        <AssignmentEditForm assignmentId={params.id} />
      </Suspense>
    </div>
  );
}
