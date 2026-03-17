'use client';

import { Suspense } from 'react';
import { TeacherDetail } from '@/components/principal/teachers/TeacherDetail';
import { TeacherDetailSkeleton } from '@/components/principal/teachers/TeacherDetailSkeleton';

export default function TeacherDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Details</h1>
          <p className="text-gray-600">View and manage teacher information</p>
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

      <Suspense fallback={<TeacherDetailSkeleton />}>
        <TeacherDetail teacherId={params.id} />
      </Suspense>
    </div>
  );
}
