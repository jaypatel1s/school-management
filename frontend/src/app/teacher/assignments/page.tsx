'use client';

import { Suspense } from 'react';
import { TeacherAssignmentsList } from '@/components/teacher/assignments/TeacherAssignmentsList';
import { TeacherAssignmentsListSkeleton } from '@/components/teacher/assignments/TeacherAssignmentsListSkeleton';

export default function TeacherAssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
          <p className="text-gray-600">Manage assignments for your courses</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create Assignment
        </button>
      </div>

      <Suspense fallback={<TeacherAssignmentsListSkeleton />}>
        <TeacherAssignmentsList />
      </Suspense>
    </div>
  );
}
