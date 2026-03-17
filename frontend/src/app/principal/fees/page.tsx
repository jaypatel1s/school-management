'use client';

import { Suspense } from 'react';
import { FeesList } from '@/components/principal/fees/FeesList';
import { FeesListSkeleton } from '@/components/principal/fees/FeesListSkeleton';

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fees</h1>
          <p className="text-gray-600">Manage all student fees in your college</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Fee
        </button>
      </div>

      <Suspense fallback={<FeesListSkeleton />}>
        <FeesList />
      </Suspense>
    </div>
  );
}
