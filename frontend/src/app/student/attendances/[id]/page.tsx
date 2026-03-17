'use client';

import { Suspense } from 'react';
import { StudentAttendanceDetail } from '@/components/student/attendances/StudentAttendanceDetail';
import { StudentAttendanceDetailSkeleton } from '@/components/student/attendances/StudentAttendanceDetailSkeleton';

export default function StudentAttendanceDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Details</h1>
          <p className="text-gray-600">View detailed attendance information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Back to Attendance
        </button>
      </div>

      <Suspense fallback={<StudentAttendanceDetailSkeleton />}>
        <StudentAttendanceDetail attendanceId={params.id} />
      </Suspense>
    </div>
  );
}
