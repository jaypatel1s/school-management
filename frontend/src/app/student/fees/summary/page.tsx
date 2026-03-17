'use client';

import { Suspense } from 'react';
import { StudentFeeSummary } from '@/components/student/fees/StudentFeeSummary';
import { StudentFeeSummarySkeleton } from '@/components/student/fees/StudentFeeSummarySkeleton';

export default function StudentFeeSummaryPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fee Summary</h1>
          <p className="text-gray-600">View comprehensive fee overview</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Pay All Dues
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Summary
          </button>
        </div>
      </div>

      <Suspense fallback={<StudentFeeSummarySkeleton />}>
        <StudentFeeSummary />
      </Suspense>
    </div>
  );
}
