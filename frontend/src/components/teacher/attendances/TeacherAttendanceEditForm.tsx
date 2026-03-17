import { fetchTeacherAttendance, updateTeacherAttendance } from '@/lib/teachers/attendances';
import { TeacherAttendanceForm } from './TeacherAttendanceForm';

interface TeacherAttendanceEditFormProps {
  attendanceId: string;
}

export async function TeacherAttendanceEditForm({ attendanceId }: TeacherAttendanceEditFormProps) {
  const attendance = await fetchTeacherAttendance(attendanceId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateTeacherAttendance(attendanceId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <TeacherAttendanceForm
        initialData={attendance}
        onSubmit={handleUpdate}
        submitText="Update Attendance"
      />
    </div>
  );
}
