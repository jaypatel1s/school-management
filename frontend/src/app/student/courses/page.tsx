'use client';

import { Suspense } from 'react';
import { StudentCoursesList } from '@/components/student/courses/StudentCoursesList';
import { StudentCoursesListSkeleton } from '@/components/student/courses/StudentCoursesListSkeleton';

export default function StudentCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600">View and manage your enrolled courses</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Browse Courses
        </button>
      </div>

      <Suspense fallback={<StudentCoursesListSkeleton />}>
        <StudentCoursesList />
      </Suspense>
    </div>
  );
}
