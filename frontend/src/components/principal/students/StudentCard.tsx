import { Student } from '@/types/principals';
import Link from 'next/link';

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-xl font-semibold text-gray-600">
            {student.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{student.name}</h3>
          <p className="text-sm text-gray-600">{student.roll_number}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Email:</span>
          <span className="text-gray-900">{student.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Phone:</span>
          <span className="text-gray-900">{student.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Courses:</span>
          <span className="text-gray-900">{student.courses?.length || 0}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/principal/students/${student.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
