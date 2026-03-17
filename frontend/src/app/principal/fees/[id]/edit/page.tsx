'use client';

import { Suspense } from 'react';
import { FeeEditForm } from '@/components/principal/fees/FeeEditForm';
import { FeeEditFormSkeleton } from '@/components/principal/fees/FeeEditFormSkeleton';

export default function EditFeePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Fee</h1>
          <p className="text-gray-600">Update fee information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<FeeEditFormSkeleton />}>
        <FeeEditForm feeId={params.id} />
      </Suspense>
    </div>
  );
}
