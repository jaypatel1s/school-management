import { fetchStudentAttendances } from '@/lib/students/attendances';
import { StudentAttendanceCard } from './StudentAttendanceCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function StudentAttendancesList() {
  const attendances = await fetchStudentAttendances();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search attendance records..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attendances.map((attendance) => (
          <StudentAttendanceCard key={attendance.id} attendance={attendance} />
        ))}
      </div>

      {attendances.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No attendance records found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
