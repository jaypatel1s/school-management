'use client';

import { fetchStudentAttendance } from '@/lib/students/attendances';
import { StudentAttendanceInfo } from './StudentAttendanceInfo';

interface StudentAttendanceDetailProps {
  attendanceId: string;
}

export async function StudentAttendanceDetail({ attendanceId }: StudentAttendanceDetailProps) {
  const attendance = await fetchStudentAttendance(attendanceId);

  return (
    <div className="space-y-6">
      <StudentAttendanceInfo attendance={attendance} />
    </div>
  );
}
