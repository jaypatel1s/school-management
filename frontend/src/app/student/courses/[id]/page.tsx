'use client';

import { Suspense } from 'react';
import { StudentCourseDetail } from '@/components/student/courses/StudentCourseDetail';
import { StudentCourseDetailSkeleton } from '@/components/student/courses/StudentCourseDetailSkeleton';

export default function StudentCourseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Details</h1>
          <p className="text-gray-600">View course information and materials</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Back to Courses
        </button>
      </div>

      <Suspense fallback={<StudentCourseDetailSkeleton />}>
        <StudentCourseDetail courseId={params.id} />
      </Suspense>
    </div>
  );
}
