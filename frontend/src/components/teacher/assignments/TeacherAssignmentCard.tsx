import { TeacherAssignment } from '@/types/teachers';
import Link from 'next/link';

interface TeacherAssignmentCardProps {
  assignment: TeacherAssignment;
}

export function TeacherAssignmentCard({ assignment }: TeacherAssignmentCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">{assignment.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{assignment.description}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Course:</span>
          <span className="text-gray-900">{assignment.course}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Due Date:</span>
          <span className="text-gray-900">{assignment.due_date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Submissions:</span>
          <span className="text-gray-900">{assignment.submissions_count}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Pending:</span>
          <span className="text-orange-600">{assignment.pending_submissions_count}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/teacher/assignments/${assignment.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
