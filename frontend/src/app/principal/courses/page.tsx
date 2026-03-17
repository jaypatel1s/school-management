'use client';

import { Suspense } from 'react';
import { CoursesList } from '@/components/principal/courses/CoursesList';
import { CoursesListSkeleton } from '@/components/principal/courses/CoursesListSkeleton';

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600">Manage all courses in your college</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Course
        </button>
      </div>

      <Suspense fallback={<CoursesListSkeleton />}>
        <CoursesList />
      </Suspense>
    </div>
  );
}
