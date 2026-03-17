'use client';

import { Suspense } from 'react';
import { StudentAttendancesList } from '@/components/student/attendances/StudentAttendancesList';
import { StudentAttendancesListSkeleton } from '@/components/student/attendances/StudentAttendancesListSkeleton';

export default function StudentAttendancesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
          <p className="text-gray-600">View your attendance records</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Download Report
        </button>
      </div>

      <Suspense fallback={<StudentAttendancesListSkeleton />}>
        <StudentAttendancesList />
      </Suspense>
    </div>
  );
}
