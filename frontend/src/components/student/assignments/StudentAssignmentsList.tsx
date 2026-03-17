import { fetchStudentAssignments } from '@/lib/students/assignments';
import { StudentAssignmentCard } from './StudentAssignmentCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function StudentAssignmentsList() {
  const assignments = await fetchStudentAssignments();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search assignments..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <StudentAssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>

      {assignments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No assignments found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
