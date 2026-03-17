'use client';

import { Suspense } from 'react';
import { AssignmentsList } from '@/components/principal/assignments/AssignmentsList';
import { AssignmentsListSkeleton } from '@/components/principal/assignments/AssignmentsListSkeleton';

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600">Manage all assignments in your college</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Assignment
        </button>
      </div>

      <Suspense fallback={<AssignmentsListSkeleton />}>
        <AssignmentsList />
      </Suspense>
    </div>
  );
}
