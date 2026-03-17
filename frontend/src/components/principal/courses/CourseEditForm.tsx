import { fetchCourse, updateCourse } from '@/lib/principals/courses';
import { CourseForm } from './CourseForm';

interface CourseEditFormProps {
  courseId: string;
}

export async function CourseEditForm({ courseId }: CourseEditFormProps) {
  const course = await fetchCourse(courseId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateCourse(courseId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <CourseForm 
        initialData={course} 
        onSubmit={handleUpdate}
        submitText="Update Course"
      />
    </div>
  );
}
