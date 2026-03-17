'use client';

import { Suspense } from 'react';
import { StudentBookDetail } from '@/components/student/books/StudentBookDetail';
import { StudentBookDetailSkeleton } from '@/components/student/books/StudentBookDetailSkeleton';

export default function StudentBookDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book Details</h1>
          <p className="text-gray-600">View book information and availability</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Back to Books
        </button>
      </div>

      <Suspense fallback={<StudentBookDetailSkeleton />}>
        <StudentBookDetail bookSlug={params.slug} />
      </Suspense>
    </div>
  );
}
