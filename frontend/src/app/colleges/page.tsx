'use client';

import { Suspense } from 'react';
import { PublicCollegesList } from '@/components/public/colleges/PublicCollegesList';
import { PublicCollegesListSkeleton } from '@/components/public/colleges/PublicCollegesListSkeleton';

export default function PublicCollegesPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your College</h1>
        <p className="text-xl text-gray-600">Browse and explore colleges in our system</p>
      </div>

      <Suspense fallback={<PublicCollegesListSkeleton />}>
        <PublicCollegesList />
      </Suspense>
    </div>
  );
}
