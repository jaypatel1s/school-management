'use client';

import { Suspense } from 'react';
import { SemesterEditForm } from '@/components/principal/semesters/SemesterEditForm';
import { SemesterEditFormSkeleton } from '@/components/principal/semesters/SemesterEditFormSkeleton';

export default function EditSemesterPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Semester</h1>
          <p className="text-gray-600">Update semester information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<SemesterEditFormSkeleton />}>
        <SemesterEditForm semesterId={params.id} />
      </Suspense>
    </div>
  );
}
