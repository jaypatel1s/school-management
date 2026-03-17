'use client';

import { Suspense } from 'react';
import { SuperAdminUsersList } from '@/components/super_admin/users/SuperAdminUsersList';
import { SuperAdminUsersListSkeleton } from '@/components/super_admin/users/SuperAdminUsersListSkeleton';

export default function SuperAdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage all users in the system</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add User
        </button>
      </div>

      <Suspense fallback={<SuperAdminUsersListSkeleton />}>
        <SuperAdminUsersList />
      </Suspense>
    </div>
  );
}
