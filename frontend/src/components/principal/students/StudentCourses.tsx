import { Suspense } from 'react';
import { StudentCoursesList } from './StudentCoursesList';
import { StudentCoursesListSkeleton } from './StudentCoursesListSkeleton';

interface StudentCoursesProps {
  studentId: string;
}

export function StudentCourses({ studentId }: StudentCoursesProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrolled Courses</h3>
      
      <Suspense fallback={<StudentCoursesListSkeleton />}>
        <StudentCoursesList studentId={studentId} />
      </Suspense>
    </div>
  );
}
