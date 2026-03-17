import { fetchStudentCourses } from '@/lib/students/courses';
import { StudentCourseCard } from './StudentCourseCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function StudentCoursesList() {
  const courses = await fetchStudentCourses();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search courses..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <StudentCourseCard key={course.id} course={course} />
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
