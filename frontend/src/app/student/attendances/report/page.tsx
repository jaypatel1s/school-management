'use client';

import { Suspense } from 'react';
import { StudentAttendanceReport } from '@/components/student/attendances/StudentAttendanceReport';
import { StudentAttendanceReportSkeleton } from '@/components/student/attendances/StudentAttendanceReportSkeleton';

export default function StudentAttendanceReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Report</h1>
          <p className="text-gray-600">View comprehensive attendance statistics</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Export PDF
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Print
          </button>
        </div>
      </div>

      <Suspense fallback={<StudentAttendanceReportSkeleton />}>
        <StudentAttendanceReport />
      </Suspense>
    </div>
  );
}
