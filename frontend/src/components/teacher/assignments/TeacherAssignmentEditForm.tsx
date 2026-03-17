import { fetchTeacherAssignment, updateTeacherAssignment } from '@/lib/teachers/assignments';
import { TeacherAssignmentForm } from './TeacherAssignmentForm';

interface TeacherAssignmentEditFormProps {
  assignmentId: string;
}

export async function TeacherAssignmentEditForm({ assignmentId }: TeacherAssignmentEditFormProps) {
  const assignment = await fetchTeacherAssignment(assignmentId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateTeacherAssignment(assignmentId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <TeacherAssignmentForm
        initialData={assignment}
        onSubmit={handleUpdate}
        submitText="Update Assignment"
      />
    </div>
  );
}
