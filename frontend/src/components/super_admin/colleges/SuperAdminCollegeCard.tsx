import { SuperAdminCollege } from '@/types/super_admins';
import Link from 'next/link';

interface SuperAdminCollegeCardProps {
  college: SuperAdminCollege;
}

export function SuperAdminCollegeCard({ college }: SuperAdminCollegeCardProps) {
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
          <span className="text-gray-500">Email:</span>
          <span className="text-gray-900">{college.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Phone:</span>
          <span className="text-gray-900">{college.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Users:</span>
          <span className="text-gray-900">{college.users_count}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            college.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {college.status}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/super_admin/colleges/${college.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
