import { Attendance } from '@/types/principals';

interface AttendanceInfoProps {
  attendance: Attendance;
}

export function AttendanceInfo({ attendance }: AttendanceInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Attendance Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Course</p>
          <p className="font-medium">{attendance.course}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Session</p>
          <p className="font-medium">{attendance.session}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">{attendance.date}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Teacher</p>
          <p className="font-medium">{attendance.teacher}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Present Students</p>
          <p className="font-medium text-green-600">{attendance.present_count}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Absent Students</p>
          <p className="font-medium text-red-600">{attendance.absent_count}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="font-medium">{attendance.total_students}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Attendance Rate</p>
          <p className="font-medium">{attendance.attendance_rate}%</p>
        </div>
      </div>
    </div>
  );
}
