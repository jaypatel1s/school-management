import { Attendance } from '@/types/principals';
import Link from 'next/link';

interface AttendanceCardProps {
  attendance: Attendance;
}

export function AttendanceCard({ attendance }: AttendanceCardProps) {
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
          <span className="text-gray-500">Teacher:</span>
          <span className="text-gray-900">{attendance.teacher}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Present:</span>
          <span className="text-green-600">{attendance.present_count}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Absent:</span>
          <span className="text-red-600">{attendance.absent_count}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Total:</span>
          <span className="text-gray-900">{attendance.total_students}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/principal/attendances/${attendance.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
