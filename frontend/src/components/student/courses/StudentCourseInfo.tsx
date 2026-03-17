import { StudentCourse } from '@/types/students';

interface StudentCourseInfoProps {
  course: StudentCourse;
}

export function StudentCourseInfo({ course }: StudentCourseInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Information</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
          <p className="text-gray-600 mt-2">{course.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Course Code</p>
            <p className="font-medium">{course.code}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Credits</p>
            <p className="font-medium">{course.credits}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Schedule</p>
            <p className="font-medium">{course.schedule}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Teacher</p>
            <p className="font-medium">{course.teacher}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Status</p>
            <span className={`px-2 py-1 rounded-full text-sm ${
              course.status === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {course.status}
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Grade</p>
            <p className="font-medium">{course.grade || 'Not graded yet'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
