'use client';

import { Suspense } from 'react';
import { SuperAdminUserDetail } from '@/components/super_admin/users/SuperAdminUserDetail';
import { SuperAdminUserDetailSkeleton } from '@/components/super_admin/users/SuperAdminUserDetailSkeleton';

export default function SuperAdminUserDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-600">View and manage user information</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Edit
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>

      <Suspense fallback={<SuperAdminUserDetailSkeleton />}>
        <SuperAdminUserDetail userId={params.id} />
      </Suspense>
    </div>
  );
}
