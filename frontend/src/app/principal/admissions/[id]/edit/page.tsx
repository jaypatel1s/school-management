'use client';

import { Suspense } from 'react';
import { AdmissionEditForm } from '@/components/principal/admissions/AdmissionEditForm';
import { AdmissionEditFormSkeleton } from '@/components/principal/admissions/AdmissionEditFormSkeleton';

export default function EditAdmissionPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Admission</h1>
          <p className="text-gray-600">Update admission application</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<AdmissionEditFormSkeleton />}>
        <AdmissionEditForm admissionId={params.id} />
      </Suspense>
    </div>
  );
}
