import { PublicCollege } from '@/types/public';

interface PublicCollegeInfoProps {
  college: PublicCollege;
}

export function PublicCollegeInfo({ college }: PublicCollegeInfoProps) {
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
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-medium">{college.location}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Type</p>
          <p className="font-medium">{college.type}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Website</p>
          <p className="font-medium">{college.website}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{college.email}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{college.phone}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Founded Year</p>
          <p className="font-medium">{college.founded_year}</p>
        </div>
      </div>

      {college.description && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-500 mb-2">About</p>
          <p className="text-gray-900">{college.description}</p>
        </div>
      )}
    </div>
  );
}
