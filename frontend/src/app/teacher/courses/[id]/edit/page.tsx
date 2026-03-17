'use client';

import { Suspense } from 'react';
import { TeacherCourseEditForm } from '@/components/teacher/courses/TeacherCourseEditForm';
import { TeacherCourseEditFormSkeleton } from '@/components/teacher/courses/TeacherCourseEditFormSkeleton';

export default function EditTeacherCoursePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
          <p className="text-gray-600">Update course information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<TeacherCourseEditFormSkeleton />}>
        <TeacherCourseEditForm courseId={params.id} />
      </Suspense>
    </div>
  );
}
