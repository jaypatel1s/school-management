import { StudentFee } from '@/types/students';

interface StudentFeeInfoProps {
  fee: StudentFee;
}

export function StudentFeeInfo({ fee }: StudentFeeInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Fee Details</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{fee.name}</h3>
          <p className="text-gray-600 mt-2">{fee.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-medium text-lg">${fee.amount}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">{fee.due_date}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Status</p>
            <span className={`px-2 py-1 rounded-full text-sm ${
              fee.status === 'Paid' 
                ? 'bg-green-100 text-green-800' 
                : fee.status === 'Pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {fee.status}
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Payment Method</p>
            <p className="font-medium">{fee.payment_method || 'Not paid yet'}</p>
          </div>
        </div>

        {fee.paid_at && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500">Paid on: {fee.paid_at}</p>
          </div>
        )}
      </div>
    </div>
  );
}
