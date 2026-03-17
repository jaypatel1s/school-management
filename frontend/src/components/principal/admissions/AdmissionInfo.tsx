import { Admission } from '@/types/principals';

interface AdmissionInfoProps {
  admission: Admission;
}

export function AdmissionInfo({ admission }: AdmissionInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Admission Details</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{admission.student_name}</h3>
          <p className="text-gray-600">Application for {admission.course}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{admission.email}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{admission.phone}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Application Date</p>
            <p className="font-medium">{admission.application_date}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Status</p>
            <span className={`px-2 py-1 rounded-full text-sm ${
              admission.status === 'Approved' 
                ? 'bg-green-100 text-green-800' 
                : admission.status === 'Pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {admission.status}
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Previous School</p>
            <p className="font-medium">{admission.previous_school}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Application Fee</p>
            <p className="font-medium">${admission.application_fee}</p>
          </div>
        </div>

        {admission.address && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Address</p>
            <p className="text-gray-900">{admission.address}</p>
          </div>
        )}

        {admission.notes && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Notes</p>
            <p className="text-gray-900">{admission.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
