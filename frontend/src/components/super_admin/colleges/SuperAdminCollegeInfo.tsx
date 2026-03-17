import { SuperAdminCollege } from '@/types/super_admins';

interface SuperAdminCollegeInfoProps {
  college: SuperAdminCollege;
}

export function SuperAdminCollegeInfo({ college }: SuperAdminCollegeInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">College Information</h2>
      
      <div className="flex items-center space-x-6 mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-3xl font-semibold text-gray-600">
            {college.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{college.name}</h3>
          <p className="text-gray-600">{college.code}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{college.email}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{college.phone}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-medium">{college.address}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Website</p>
          <p className="font-medium">{college.website}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="font-medium">{college.users_count}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Status</p>
          <span className={`px-2 py-1 rounded-full text-sm ${
            college.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {college.status}
          </span>
        </div>
      </div>
    </div>
  );
}
