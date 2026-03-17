import { PublicAdmission } from '@/types/public';

interface PublicAdmissionInfoProps {
  admission: PublicAdmission;
}

export function PublicAdmissionInfo({ admission }: PublicAdmissionInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Admission Information</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{admission.title}</h3>
          <p className="text-gray-600 mt-2">{admission.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">College</p>
            <p className="font-medium">{admission.college.name}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Course</p>
            <p className="font-medium">{admission.course}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-medium">{admission.start_date}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">End Date</p>
            <p className="font-medium">{admission.end_date}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Application Fee</p>
            <p className="font-medium">${admission.application_fee}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Status</p>
            <span className={`px-2 py-1 rounded-full text-sm ${
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

        {admission.eligibility && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Eligibility Criteria</p>
            <p className="text-gray-900">{admission.eligibility}</p>
          </div>
        )}

        {admission.requirements && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Requirements</p>
            <p className="text-gray-900">{admission.requirements}</p>
          </div>
        )}
      </div>
    </div>
  );
}
