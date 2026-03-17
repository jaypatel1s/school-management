'use client';

import { fetchStudent } from '@/lib/principals/students';
import { StudentInfo } from './StudentInfo';
import { StudentCourses } from './StudentCourses';
import { StudentAttendances } from './StudentAttendances';
import { StudentBookIssues } from './StudentBookIssues';

interface StudentDetailProps {
  studentId: string;
}

export async function StudentDetail({ studentId }: StudentDetailProps) {
  const student = await fetchStudent(studentId);

  return (
    <div className="space-y-6">
      <StudentInfo student={student} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentCourses studentId={studentId} />
        <StudentAttendances studentId={studentId} />
      </div>
      
      <StudentBookIssues studentId={studentId} />
    </div>
  );
}
