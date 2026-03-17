import { Student } from '@/types/principals';

interface StudentInfoProps {
  student: Student;
}

export function StudentInfo({ student }: StudentInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Information</h2>
      
      <div className="flex items-center space-x-6 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-3xl font-semibold text-gray-600">
            {student.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{student.name}</h3>
          <p className="text-gray-600">{student.roll_number}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{student.email}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{student.phone}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-medium">{student.address}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Enrolled Courses</p>
          <p className="font-medium">{student.courses?.length || 0}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Attendance Rate</p>
          <p className="font-medium">85%</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Books Issued</p>
          <p className="font-medium">{student.book_issues_count}</p>
        </div>
      </div>
    </div>
  );
}
