'use client';

import { Suspense } from 'react';
import { TeacherCourseDetail } from '@/components/teacher/courses/TeacherCourseDetail';
import { TeacherCourseDetailSkeleton } from '@/components/teacher/courses/TeacherCourseDetailSkeleton';

export default function TeacherCourseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Details</h1>
          <p className="text-gray-600">View and manage your course</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Edit Course
        </button>
      </div>

      <Suspense fallback={<TeacherCourseDetailSkeleton />}>
        <TeacherCourseDetail courseId={params.id} />
      </Suspense>
    </div>
  );
}
