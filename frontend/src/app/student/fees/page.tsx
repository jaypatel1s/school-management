'use client';

import { Suspense } from 'react';
import { StudentFeesList } from '@/components/student/fees/StudentFeesList';
import { StudentFeesListSkeleton } from '@/components/student/fees/StudentFeesListSkeleton';

export default function StudentFeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Fees</h1>
          <p className="text-gray-600">View and manage your fee payments</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Pay Fees
        </button>
      </div>

      <Suspense fallback={<StudentFeesListSkeleton />}>
        <StudentFeesList />
      </Suspense>
    </div>
  );
}
