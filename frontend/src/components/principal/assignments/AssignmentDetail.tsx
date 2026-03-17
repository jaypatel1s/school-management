'use client';

import { fetchAssignment } from '@/lib/principals/assignments';
import { AssignmentInfo } from './AssignmentInfo';
import { AssignmentSubmissions } from './AssignmentSubmissions';

interface AssignmentDetailProps {
  assignmentId: string;
}

export async function AssignmentDetail({ assignmentId }: AssignmentDetailProps) {
  const assignment = await fetchAssignment(assignmentId);

  return (
    <div className="space-y-6">
      <AssignmentInfo assignment={assignment} />
      <AssignmentSubmissions assignmentId={assignmentId} />
    </div>
  );
}
