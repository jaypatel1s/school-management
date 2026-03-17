import { fetchCourses } from '@/lib/principals/courses';
import { CourseCard } from './CourseCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function CoursesList() {
  const courses = await fetchCourses();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search courses..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
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
