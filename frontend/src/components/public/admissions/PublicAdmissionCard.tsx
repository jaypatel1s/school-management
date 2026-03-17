import { PublicAdmission } from '@/types/public';
import Link from 'next/link';

interface PublicAdmissionCardProps {
  admission: PublicAdmission;
}

export function PublicAdmissionCard({ admission }: PublicAdmissionCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">{admission.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{admission.college.name}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Course:</span>
          <span className="text-gray-900">{admission.course}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Start Date:</span>
          <span className="text-gray-900">{admission.start_date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">End Date:</span>
          <span className="text-gray-900">{admission.end_date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            admission.status === 'Open' 
              ? 'bg-green-100 text-green-800' 
              : admission.status === 'Closed'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {admission.status}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/admissions/${admission.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
