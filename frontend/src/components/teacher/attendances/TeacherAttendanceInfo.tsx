import { TeacherAttendance } from '@/types/teachers';

interface TeacherAttendanceInfoProps {
  attendance: TeacherAttendance;
}

export function TeacherAttendanceInfo({ attendance }: TeacherAttendanceInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Attendance Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Student Name</p>
          <p className="font-medium">{attendance.student_name}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Roll Number</p>
          <p className="font-medium">{attendance.roll_number}</p>
        </div>
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
          <p className="text-sm text-gray-500">Status</p>
          <span className={`px-2 py-1 rounded-full text-sm ${
            attendance.present 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {attendance.present ? 'Present' : 'Absent'}
          </span>
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
