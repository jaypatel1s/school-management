'use client';

import { Suspense } from 'react';
import { StudentAssignmentDetail } from '@/components/student/assignments/StudentAssignmentDetail';
import { StudentAssignmentDetailSkeleton } from '@/components/student/assignments/StudentAssignmentDetailSkeleton';

export default function StudentAssignmentDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignment Details</h1>
          <p className="text-gray-600">View assignment details and submit your work</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Back to Assignments
        </button>
      </div>

      <Suspense fallback={<StudentAssignmentDetailSkeleton />}>
        <StudentAssignmentDetail assignmentId={params.id} />
      </Suspense>
    </div>
  );
}
