import { StudentFee } from '@/types/students';
import Link from 'next/link';

interface StudentFeeCardProps {
  fee: StudentFee;
}

export function StudentFeeCard({ fee }: StudentFeeCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">{fee.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{fee.description}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Amount:</span>
          <span className="font-medium text-gray-900">${fee.amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Due Date:</span>
          <span className="text-gray-900">{fee.due_date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            fee.status === 'Paid' 
              ? 'bg-green-100 text-green-800' 
              : fee.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {fee.status}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/student/fees/${fee.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
