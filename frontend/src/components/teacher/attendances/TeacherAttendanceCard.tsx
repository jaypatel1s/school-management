import { TeacherAttendance } from '@/types/teachers';
import Link from 'next/link';

interface TeacherAttendanceCardProps {
  attendance: TeacherAttendance;
}

export function TeacherAttendanceCard({ attendance }: TeacherAttendanceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900">{attendance.course}</h3>
        <p className="text-gray-600 text-sm mt-1">{attendance.session}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Date:</span>
          <span className="text-gray-900">{attendance.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            attendance.present 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {attendance.present ? 'Present' : 'Absent'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Student:</span>
          <span className="text-gray-900">{attendance.student_name}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/teacher/attendances/${attendance.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
