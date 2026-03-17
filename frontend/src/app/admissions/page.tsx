'use client';

import { Suspense } from 'react';
import { PublicAdmissionsList } from '@/components/public/admissions/PublicAdmissionsList';
import { PublicAdmissionsListSkeleton } from '@/components/public/admissions/PublicAdmissionsListSkeleton';

export default function PublicAdmissionsPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Apply for Admission</h1>
        <p className="text-xl text-gray-600">Start your journey to higher education</p>
      </div>

      <div className="flex justify-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg">
          Apply Now
        </button>
      </div>

      <Suspense fallback={<PublicAdmissionsListSkeleton />}>
        <PublicAdmissionsList />
      </Suspense>
    </div>
  );
}
