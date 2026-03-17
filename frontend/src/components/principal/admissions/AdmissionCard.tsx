import { Admission } from '@/types/principals';
import Link from 'next/link';

interface AdmissionCardProps {
  admission: Admission;
}

export function AdmissionCard({ admission }: AdmissionCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">{admission.student_name}</h3>
        <p className="text-gray-600 text-sm mt-1">{admission.course}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Application Date:</span>
          <span className="text-gray-900">{admission.application_date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Email:</span>
          <span className="text-gray-900">{admission.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Phone:</span>
          <span className="text-gray-900">{admission.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            admission.status === 'Approved' 
              ? 'bg-green-100 text-green-800' 
              : admission.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {admission.status}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/principal/admissions/${admission.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
