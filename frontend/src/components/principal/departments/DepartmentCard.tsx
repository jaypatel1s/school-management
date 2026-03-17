import { Department } from '@/types/principals';
import Link from 'next/link';

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">{department.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{department.code}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Head:</span>
          <span className="text-gray-900">{department.head?.name || 'Not assigned'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Teachers:</span>
          <span className="text-gray-900">{department.teachers_count}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Courses:</span>
          <span className="text-gray-900">{department.courses_count}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Students:</span>
          <span className="text-gray-900">{department.students_count}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/principal/departments/${department.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
