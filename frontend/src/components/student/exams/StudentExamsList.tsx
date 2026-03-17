import { fetchStudentExams } from '@/lib/students/exams';
import { StudentExamCard } from './StudentExamCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function StudentExamsList() {
  const exams = await fetchStudentExams();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search exams..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <StudentExamCard key={exam.id} exam={exam} />
        ))}
      </div>

      {exams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No exams found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
