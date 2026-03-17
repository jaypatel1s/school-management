'use client';

import { Suspense } from 'react';
import { PublicAdmissionDetail } from '@/components/public/admissions/PublicAdmissionDetail';
import { PublicAdmissionDetailSkeleton } from '@/components/public/admissions/PublicAdmissionDetailSkeleton';

export default function PublicAdmissionDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<PublicAdmissionDetailSkeleton />}>
        <PublicAdmissionDetail admissionId={params.id} />
      </Suspense>
    </div>
  );
}
