'use client';

import { fetchStudentExam } from '@/lib/students/exams';
import { StudentExamInfo } from './StudentExamInfo';

interface StudentExamDetailProps {
  examId: string;
}

export async function StudentExamDetail({ examId }: StudentExamDetailProps) {
  const exam = await fetchStudentExam(examId);

  return (
    <div className="space-y-6">
      <StudentExamInfo exam={exam} />
    </div>
  );
}
