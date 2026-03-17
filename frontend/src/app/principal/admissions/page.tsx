'use client';

import { Suspense } from 'react';
import { AdmissionsList } from '@/components/principal/admissions/AdmissionsList';
import { AdmissionsListSkeleton } from '@/components/principal/admissions/AdmissionsListSkeleton';

export default function AdmissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admissions</h1>
          <p className="text-gray-600">Manage all admission applications</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Admission
        </button>
      </div>

      <Suspense fallback={<AdmissionsListSkeleton />}>
        <AdmissionsList />
      </Suspense>
    </div>
  );
}
