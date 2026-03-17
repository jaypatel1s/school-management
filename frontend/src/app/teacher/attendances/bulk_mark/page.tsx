'use client';

import { Suspense } from 'react';
import { TeacherBulkAttendanceForm } from '@/components/teacher/attendances/TeacherBulkAttendanceForm';
import { TeacherBulkAttendanceFormSkeleton } from '@/components/teacher/attendances/TeacherBulkAttendanceFormSkeleton';

export default function TeacherBulkAttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bulk Mark Attendance</h1>
          <p className="text-gray-600">Mark attendance for multiple students at once</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<TeacherBulkAttendanceFormSkeleton />}>
        <TeacherBulkAttendanceForm />
      </Suspense>
    </div>
  );
}
