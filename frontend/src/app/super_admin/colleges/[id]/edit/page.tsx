'use client';

import { Suspense } from 'react';
import { SuperAdminCollegeEditForm } from '@/components/super_admin/colleges/SuperAdminCollegeEditForm';
import { SuperAdminCollegeEditFormSkeleton } from '@/components/super_admin/colleges/SuperAdminCollegeEditFormSkeleton';

export default function EditSuperAdminCollegePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit College</h1>
          <p className="text-gray-600">Update college information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<SuperAdminCollegeEditFormSkeleton />}>
        <SuperAdminCollegeEditForm collegeId={params.id} />
      </Suspense>
    </div>
  );
}
