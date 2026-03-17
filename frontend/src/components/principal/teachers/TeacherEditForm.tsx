import { fetchTeacher, updateTeacher } from '@/lib/principals/teachers';
import { TeacherForm } from './TeacherForm';

interface TeacherEditFormProps {
  teacherId: string;
}

export async function TeacherEditForm({ teacherId }: TeacherEditFormProps) {
  const teacher = await fetchTeacher(teacherId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateTeacher(teacherId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <TeacherForm
        initialData={teacher}
        onSubmit={handleUpdate}
        submitText="Update Teacher"
      />
    </div>
  );
}
