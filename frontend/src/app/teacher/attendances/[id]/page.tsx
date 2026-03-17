'use client';

import { Suspense } from 'react';
import { TeacherAttendanceDetail } from '@/components/teacher/attendances/TeacherAttendanceDetail';
import { TeacherAttendanceDetailSkeleton } from '@/components/teacher/attendances/TeacherAttendanceDetailSkeleton';

export default function TeacherAttendanceDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Details</h1>
          <p className="text-gray-600">View attendance record details</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Edit
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>

      <Suspense fallback={<TeacherAttendanceDetailSkeleton />}>
        <TeacherAttendanceDetail attendanceId={params.id} />
      </Suspense>
    </div>
  );
}
