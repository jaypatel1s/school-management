import { Department } from '@/types/principals';

interface DepartmentInfoProps {
  department: Department;
}

export function DepartmentInfo({ department }: DepartmentInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Department Information</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{department.name}</h3>
          <p className="text-gray-600 mt-2">{department.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Department Code</p>
            <p className="font-medium">{department.code}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Department Head</p>
            <p className="font-medium">{department.head?.name || 'Not assigned'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Teachers</p>
            <p className="font-medium">{department.teachers_count}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Courses</p>
            <p className="font-medium">{department.courses_count}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Students</p>
            <p className="font-medium">{department.students_count}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Established Year</p>
            <p className="font-medium">{department.established_year}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
