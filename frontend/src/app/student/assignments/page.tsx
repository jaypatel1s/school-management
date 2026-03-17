'use client';

import { Suspense } from 'react';
import { StudentAssignmentsList } from '@/components/student/assignments/StudentAssignmentsList';
import { StudentAssignmentsListSkeleton } from '@/components/student/assignments/StudentAssignmentsListSkeleton';

export default function StudentAssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
          <p className="text-gray-600">View and submit your assignments</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          View Calendar
        </button>
      </div>

      <Suspense fallback={<StudentAssignmentsListSkeleton />}>
        <StudentAssignmentsList />
      </Suspense>
    </div>
  );
}
