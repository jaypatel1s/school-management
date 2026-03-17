import { fetchTeacherCourse, updateTeacherCourse } from '@/lib/teachers/semesters';
import { TeacherCourseForm } from './TeacherCourseForm';

interface TeacherCourseEditFormProps {
  courseId: string;
}

export async function TeacherCourseEditForm({ courseId }: TeacherCourseEditFormProps) {
  const course = await fetchTeacherCourse(courseId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateTeacherCourse(courseId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <TeacherCourseForm
        initialData={course}
        onSubmit={handleUpdate}
        submitText="Update Course"
      />
    </div>
  );
}
