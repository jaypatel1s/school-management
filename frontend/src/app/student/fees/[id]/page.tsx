'use client';

import { Suspense } from 'react';
import { StudentFeeDetail } from '@/components/student/fees/StudentFeeDetail';
import { StudentFeeDetailSkeleton } from '@/components/student/fees/StudentFeeDetailSkeleton';

export default function StudentFeeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fee Details</h1>
          <p className="text-gray-600">View fee payment details</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Pay Now
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Download Receipt
          </button>
        </div>
      </div>

      <Suspense fallback={<StudentFeeDetailSkeleton />}>
        <StudentFeeDetail feeId={params.id} />
      </Suspense>
    </div>
  );
}
