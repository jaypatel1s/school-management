'use client';

import { Suspense } from 'react';
import { AttendanceEditForm } from '@/components/principal/attendances/AttendanceEditForm';
import { AttendanceEditFormSkeleton } from '@/components/principal/attendances/AttendanceEditFormSkeleton';

export default function EditAttendancePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Attendance</h1>
          <p className="text-gray-600">Update attendance record</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<AttendanceEditFormSkeleton />}>
        <AttendanceEditForm attendanceId={params.id} />
      </Suspense>
    </div>
  );
}
