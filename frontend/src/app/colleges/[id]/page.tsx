'use client';

import { Suspense } from 'react';
import { PublicCollegeDetail } from '@/components/public/colleges/PublicCollegeDetail';
import { PublicCollegeDetailSkeleton } from '@/components/public/colleges/PublicCollegeDetailSkeleton';

export default function PublicCollegeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<PublicCollegeDetailSkeleton />}>
        <PublicCollegeDetail collegeId={params.id} />
      </Suspense>
    </div>
  );
}
