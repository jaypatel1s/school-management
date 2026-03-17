'use client';

import { Suspense } from 'react';
import { SuperAdminCollegesList } from '@/components/super_admin/colleges/SuperAdminCollegesList';
import { SuperAdminCollegesListSkeleton } from '@/components/super_admin/colleges/SuperAdminCollegesListSkeleton';

export default function SuperAdminCollegesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Colleges</h1>
          <p className="text-gray-600">Manage all colleges in the system</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add College
        </button>
      </div>

      <Suspense fallback={<SuperAdminCollegesListSkeleton />}>
        <SuperAdminCollegesList />
      </Suspense>
    </div>
  );
}
