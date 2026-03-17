import { fetchAssignment, updateAssignment } from '@/lib/principals/assignments';
import { AssignmentForm } from './AssignmentForm';

interface AssignmentEditFormProps {
  assignmentId: string;
}

export async function AssignmentEditForm({ assignmentId }: AssignmentEditFormProps) {
  const assignment = await fetchAssignment(assignmentId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateAssignment(assignmentId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <AssignmentForm
        initialData={assignment}
        onSubmit={handleUpdate}
        submitText="Update Assignment"
      />
    </div>
  );
}
