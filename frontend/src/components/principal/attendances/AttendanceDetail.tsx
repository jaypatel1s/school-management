'use client';

import { fetchAttendance } from '@/lib/principals/attendances';
import { AttendanceInfo } from './AttendanceInfo';

interface AttendanceDetailProps {
  attendanceId: string;
}

export async function AttendanceDetail({ attendanceId }: AttendanceDetailProps) {
  const attendance = await fetchAttendance(attendanceId);

  return (
    <div className="space-y-6">
      <AttendanceInfo attendance={attendance} />
    </div>
  );
}
