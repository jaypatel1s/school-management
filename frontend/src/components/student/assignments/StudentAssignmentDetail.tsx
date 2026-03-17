'use client';

import { fetchStudentAssignment } from '@/lib/students/assignments';
import { StudentAssignmentInfo } from './StudentAssignmentInfo';
import { StudentAssignmentSubmission } from './StudentAssignmentSubmission';

interface StudentAssignmentDetailProps {
  assignmentId: string;
}

export async function StudentAssignmentDetail({ assignmentId }: StudentAssignmentDetailProps) {
  const assignment = await fetchStudentAssignment(assignmentId);

  return (
    <div className="space-y-6">
      <StudentAssignmentInfo assignment={assignment} />
      <StudentAssignmentSubmission assignmentId={assignmentId} />
    </div>
  );
}
