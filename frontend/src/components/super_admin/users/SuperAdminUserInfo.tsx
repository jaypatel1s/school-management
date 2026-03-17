import { SuperAdminUser } from '@/types/super_admins';

interface SuperAdminUserInfoProps {
  user: SuperAdminUser;
}

export function SuperAdminUserInfo({ user }: SuperAdminUserInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
      
      <div className="flex items-center space-x-6 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-3xl font-semibold text-gray-600">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Role</p>
          <span className={`px-2 py-1 rounded-full text-sm ${
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
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{user.phone || 'N/A'}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">College</p>
          <p className="font-medium">{user.college?.name || 'N/A'}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Status</p>
          <span className={`px-2 py-1 rounded-full text-sm ${
            user.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {user.status}
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Last Login</p>
          <p className="font-medium">{user.last_login || 'Never'}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Created At</p>
          <p className="font-medium">{user.created_at}</p>
        </div>
      </div>
    </div>
  );
}
