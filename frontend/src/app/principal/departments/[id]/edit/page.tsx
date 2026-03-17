'use client';

import { Suspense } from 'react';
import { DepartmentEditForm } from '@/components/principal/departments/DepartmentEditForm';
import { DepartmentEditFormSkeleton } from '@/components/principal/departments/DepartmentEditFormSkeleton';

export default function EditDepartmentPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Department</h1>
          <p className="text-gray-600">Update department information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<DepartmentEditFormSkeleton />}>
        <DepartmentEditForm departmentId={params.id} />
      </Suspense>
    </div>
  );
}
