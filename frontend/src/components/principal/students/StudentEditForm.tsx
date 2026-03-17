import { fetchStudent, editStudent } from '@/lib/principals/students';
import { StudentForm } from './StudentForm';

interface StudentEditFormProps {
  studentId: string;
}

export async function StudentEditForm({ studentId }: StudentEditFormProps) {
  const student = await fetchStudent(studentId);

  async function handleUpdate(data: any) {
    'use server';
    return await editStudent(studentId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <StudentForm
        initialData={student}
        onSubmit={handleUpdate}
        submitText="Update Student"
      />
    </div>
  );
}
