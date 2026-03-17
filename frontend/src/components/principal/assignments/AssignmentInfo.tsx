import { Assignment } from '@/types/principals';

interface AssignmentInfoProps {
  assignment: Assignment;
}

export function AssignmentInfo({ assignment }: AssignmentInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Assignment Information</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
          <p className="text-gray-600 mt-2">{assignment.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">{assignment.due_date}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Submissions</p>
            <p className="font-medium">{assignment.submissions_count}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Pending Submissions</p>
            <p className="font-medium text-orange-600">{assignment.pending_submissions_count}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Submitted</p>
            <p className="font-medium text-green-600">{assignment.submitted_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
