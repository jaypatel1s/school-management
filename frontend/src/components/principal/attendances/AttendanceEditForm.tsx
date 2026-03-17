import { fetchAttendance, updateAttendance } from '@/lib/principals/attendances';
import { AttendanceForm } from './AttendanceForm';

interface AttendanceEditFormProps {
  attendanceId: string;
}

export async function AttendanceEditForm({ attendanceId }: AttendanceEditFormProps) {
  const attendance = await fetchAttendance(attendanceId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateAttendance(attendanceId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <AttendanceForm 
        initialData={attendance} 
        onSubmit={handleUpdate}
        submitText="Update Attendance"
      />
    </div>
  );
}
