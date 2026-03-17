'use client';

import { fetchTeacher } from '@/lib/principals/teachers';
import { TeacherInfo } from './TeacherInfo';
import { TeacherCourses } from './TeacherCourses';
import { TeacherAssignments } from './TeacherAssignments';

interface TeacherDetailProps {
  teacherId: string;
}

export async function TeacherDetail({ teacherId }: TeacherDetailProps) {
  const teacher = await fetchTeacher(teacherId);

  return (
    <div className="space-y-6">
      <TeacherInfo teacher={teacher} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeacherCourses teacherId={teacherId} />
        <TeacherAssignments teacherId={teacherId} />
      </div>
    </div>
  );
}
