'use client';

import { fetchStudentCourse } from '@/lib/students/courses';
import { StudentCourseInfo } from './StudentCourseInfo';
import { StudentCourseMaterials } from './StudentCourseMaterials';

interface StudentCourseDetailProps {
  courseId: string;
}

export async function StudentCourseDetail({ courseId }: StudentCourseDetailProps) {
  const course = await fetchStudentCourse(courseId);

  return (
    <div className="space-y-6">
      <StudentCourseInfo course={course} />
      <StudentCourseMaterials courseId={courseId} />
    </div>
  );
}
