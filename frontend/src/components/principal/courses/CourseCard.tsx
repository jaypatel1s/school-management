import { Course } from '@/types/principals';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">{course.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{course.code}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Credits:</span>
          <span className="text-gray-900">{course.credits}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Department:</span>
          <span className="text-gray-900">{course.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Teacher:</span>
          <span className="text-gray-900">{course.teacher?.name || 'Not assigned'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Students:</span>
          <span className="text-gray-900">{course.students_count}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/principal/courses/${course.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
