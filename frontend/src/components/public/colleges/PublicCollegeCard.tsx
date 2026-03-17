import { PublicCollege } from '@/types/public';
import Link from 'next/link';

interface PublicCollegeCardProps {
  college: PublicCollege;
}

export function PublicCollegeCard({ college }: PublicCollegeCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-xl font-semibold text-gray-600">
            {college.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{college.name}</h3>
          <p className="text-sm text-gray-600">{college.code}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Location:</span>
          <span className="text-gray-900">{college.location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Type:</span>
          <span className="text-gray-900">{college.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Students:</span>
          <span className="text-gray-900">{college.students_count}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Courses:</span>
          <span className="text-gray-900">{college.courses_count}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/colleges/${college.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
