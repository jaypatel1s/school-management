'use client';

import { fetchTeacherAssignment } from '@/lib/teachers/assignments';
import { TeacherAssignmentInfo } from './TeacherAssignmentInfo';
import { TeacherAssignmentSubmissions } from './TeacherAssignmentSubmissions';

interface TeacherAssignmentDetailProps {
  assignmentId: string;
}

export async function TeacherAssignmentDetail({ assignmentId }: TeacherAssignmentDetailProps) {
  const assignment = await fetchTeacherAssignment(assignmentId);

  return (
    <div className="space-y-6">
      <TeacherAssignmentInfo assignment={assignment} />
      <TeacherAssignmentSubmissions assignmentId={assignmentId} />
    </div>
  );
}
