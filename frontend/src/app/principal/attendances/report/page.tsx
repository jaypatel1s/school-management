'use client';

import { Suspense } from 'react';
import { AttendanceReport } from '@/components/principal/attendances/AttendanceReport';
import { AttendanceReportSkeleton } from '@/components/principal/attendances/AttendanceReportSkeleton';

export default function AttendanceReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Report</h1>
          <p className="text-gray-600">View comprehensive attendance statistics</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Export Report
        </button>
      </div>

      <Suspense fallback={<AttendanceReportSkeleton />}>
        <AttendanceReport />
      </Suspense>
    </div>
  );
}
