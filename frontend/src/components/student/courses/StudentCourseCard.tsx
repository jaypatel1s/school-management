import { StudentCourse } from '@/types/students';
import Link from 'next/link';

interface StudentCourseCardProps {
  course: StudentCourse;
}

export function StudentCourseCard({ course }: StudentCourseCardProps) {
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
          <span className="text-gray-500">Schedule:</span>
          <span className="text-gray-900">{course.schedule}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Teacher:</span>
          <span className="text-gray-900">{course.teacher}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            course.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {course.status}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/student/courses/${course.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
