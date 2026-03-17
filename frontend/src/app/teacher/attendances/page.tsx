'use client';

import { Suspense } from 'react';
import { TeacherAttendancesList } from '@/components/teacher/attendances/TeacherAttendancesList';
import { TeacherAttendancesListSkeleton } from '@/components/teacher/attendances/TeacherAttendancesListSkeleton';

export default function TeacherAttendancesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600">Manage student attendance for your courses</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Mark Attendance
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Bulk Mark
          </button>
        </div>
      </div>

      <Suspense fallback={<TeacherAttendancesListSkeleton />}>
        <TeacherAttendancesList />
      </Suspense>
    </div>
  );
}
