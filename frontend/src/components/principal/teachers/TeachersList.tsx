import { fetchTeachers } from '@/lib/principals/teachers';
import { TeacherCard } from './TeacherCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function TeachersList() {
  const teachers = await fetchTeachers();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search teachers..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>

      {teachers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No teachers found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
