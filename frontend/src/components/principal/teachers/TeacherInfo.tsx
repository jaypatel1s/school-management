import { Teacher } from '@/types/principals';

interface TeacherInfoProps {
  teacher: Teacher;
}

export function TeacherInfo({ teacher }: TeacherInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Teacher Information</h2>
      
      <div className="flex items-center space-x-6 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-3xl font-semibold text-gray-600">
            {teacher.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{teacher.name}</h3>
          <p className="text-gray-600">{teacher.department}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{teacher.email}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{teacher.phone}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-medium">{teacher.address}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Department</p>
          <p className="font-medium">{teacher.department}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Courses</p>
          <p className="font-medium">{teacher.courses?.length || 0}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Assignments</p>
          <p className="font-medium">{teacher.assignments_count}</p>
        </div>
      </div>
    </div>
  );
}
