'use client';

import { fetchTeacherCourse } from '@/lib/teachers/semesters';
import { TeacherCourseInfo } from './TeacherCourseInfo';
import { TeacherCourseStudents } from './TeacherCourseStudents';

interface TeacherCourseDetailProps {
  courseId: string;
}

export async function TeacherCourseDetail({ courseId }: TeacherCourseDetailProps) {
  const course = await fetchTeacherCourse(courseId);

  return (
    <div className="space-y-6">
      <TeacherCourseInfo course={course} />
      <TeacherCourseStudents courseId={courseId} />
    </div>
  );
}
