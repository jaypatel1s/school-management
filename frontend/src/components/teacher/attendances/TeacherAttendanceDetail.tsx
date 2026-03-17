'use client';

import { fetchTeacherAttendance } from '@/lib/teachers/attendances';
import { TeacherAttendanceInfo } from './TeacherAttendanceInfo';

interface TeacherAttendanceDetailProps {
  attendanceId: string;
}

export async function TeacherAttendanceDetail({ attendanceId }: TeacherAttendanceDetailProps) {
  const attendance = await fetchTeacherAttendance(attendanceId);

  return (
    <div className="space-y-6">
      <TeacherAttendanceInfo attendance={attendance} />
    </div>
  );
}
