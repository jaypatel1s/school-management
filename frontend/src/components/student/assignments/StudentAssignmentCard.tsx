import { StudentAssignment } from '@/types/students';
import Link from 'next/link';

interface StudentAssignmentCardProps {
  assignment: StudentAssignment;
}

export function StudentAssignmentCard({ assignment }: StudentAssignmentCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">{assignment.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{assignment.course}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Due Date:</span>
          <span className="text-gray-900">{assignment.due_date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Points:</span>
          <span className="text-gray-900">{assignment.total_points}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
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
          <div className="flex justify-between">
            <span className="text-gray-500">Grade:</span>
            <span className="text-gray-900">{assignment.grade}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/student/assignments/${assignment.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
