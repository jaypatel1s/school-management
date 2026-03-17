'use client';

import { fetchCourse } from '@/lib/principals/courses';
import { CourseInfo } from './CourseInfo';
import { CourseStudents } from './CourseStudents';

interface CourseDetailProps {
  courseId: string;
}

export async function CourseDetail({ courseId }: CourseDetailProps) {
  const course = await fetchCourse(courseId);

  return (
    <div className="space-y-6">
      <CourseInfo course={course} />
      <CourseStudents courseId={courseId} />
    </div>
  );
}
