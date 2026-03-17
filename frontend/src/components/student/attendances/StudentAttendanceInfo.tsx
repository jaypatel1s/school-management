import { StudentAttendance } from '@/types/students';

interface StudentAttendanceInfoProps {
  attendance: StudentAttendance;
}

export function StudentAttendanceInfo({ attendance }: StudentAttendanceInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Attendance Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Course</p>
          <p className="font-medium">{attendance.course}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">{attendance.date}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Session</p>
          <p className="font-medium">{attendance.session}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Teacher</p>
          <p className="font-medium">{attendance.teacher}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Status</p>
          <span className={`px-2 py-1 rounded-full text-sm ${
            attendance.present 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {attendance.present ? 'Present' : 'Absent'}
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Marked At</p>
          <p className="font-medium">{attendance.marked_at}</p>
        </div>
      </div>

      {attendance.notes && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-500 mb-2">Notes</p>
          <p className="text-gray-900">{attendance.notes}</p>
        </div>
      )}
    </div>
  );
}
