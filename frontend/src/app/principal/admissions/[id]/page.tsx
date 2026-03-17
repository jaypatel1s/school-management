'use client';

import { Suspense } from 'react';
import { AdmissionDetail } from '@/components/principal/admissions/AdmissionDetail';
import { AdmissionDetailSkeleton } from '@/components/principal/admissions/AdmissionDetailSkeleton';

export default function AdmissionDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admission Details</h1>
          <p className="text-gray-600">View and manage admission application</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Approve
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Reject
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Edit
          </button>
        </div>
      </div>

      <Suspense fallback={<AdmissionDetailSkeleton />}>
        <AdmissionDetail admissionId={params.id} />
      </Suspense>
    </div>
  );
}
