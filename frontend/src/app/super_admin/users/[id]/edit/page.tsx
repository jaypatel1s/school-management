'use client';

import { Suspense } from 'react';
import { SuperAdminUserEditForm } from '@/components/super_admin/users/SuperAdminUserEditForm';
import { SuperAdminUserEditFormSkeleton } from '@/components/super_admin/users/SuperAdminUserEditFormSkeleton';

export default function EditSuperAdminUserPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
          <p className="text-gray-600">Update user information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<SuperAdminUserEditFormSkeleton />}>
        <SuperAdminUserEditForm userId={params.id} />
      </Suspense>
    </div>
  );
}
