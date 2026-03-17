import { SuperAdminUser } from '@/types/super_admins';
import Link from 'next/link';

interface SuperAdminUserCardProps {
  user: SuperAdminUser;
}

export function SuperAdminUserCard({ user }: SuperAdminUserCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-xl font-semibold text-gray-600">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Role:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            user.role === 'Super Admin' 
              ? 'bg-purple-100 text-purple-800' 
              : user.role === 'Principal'
              ? 'bg-blue-100 text-blue-800'
              : user.role === 'Teacher'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {user.role}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">College:</span>
          <span className="text-gray-900">{user.college?.name || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            user.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {user.status}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/super_admin/users/${user.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
