'use client';

import { Suspense } from 'react';
import { DepartmentsList } from '@/components/principal/departments/DepartmentsList';
import { DepartmentsListSkeleton } from '@/components/principal/departments/DepartmentsListSkeleton';

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600">Manage all departments in your college</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Department
        </button>
      </div>

      <Suspense fallback={<DepartmentsListSkeleton />}>
        <DepartmentsList />
      </Suspense>
    </div>
  );
}
