import { StudentAssignment } from '@/types/students';

interface StudentAssignmentInfoProps {
  assignment: StudentAssignment;
}

export function StudentAssignmentInfo({ assignment }: StudentAssignmentInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Assignment Details</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
          <p className="text-gray-600 mt-2">{assignment.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Course</p>
            <p className="font-medium">{assignment.course}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">{assignment.due_date}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Points</p>
            <p className="font-medium">{assignment.total_points}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Status</p>
            <span className={`px-2 py-1 rounded-full text-sm ${
              assignment.status === 'Submitted' 
                ? 'bg-green-100 text-green-800' 
                : assignment.status === 'Graded'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {assignment.status}
            </span>
          </div>
          {assignment.grade && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Grade</p>
              <p className="font-medium">{assignment.grade}</p>
            </div>
          )}
          {assignment.submitted_at && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Submitted At</p>
              <p className="font-medium">{assignment.submitted_at}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
