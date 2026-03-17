import { fetchStudentFees } from '@/lib/students/fees';
import { StudentFeeCard } from './StudentFeeCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function StudentFeesList() {
  const fees = await fetchStudentFees();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search fees..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fees.map((fee) => (
          <StudentFeeCard key={fee.id} fee={fee} />
        ))}
      </div>

      {fees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No fees found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
