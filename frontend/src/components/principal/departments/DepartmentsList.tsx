import { fetchDepartments } from '@/lib/principals/departments';
import { DepartmentCard } from './DepartmentCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function DepartmentsList() {
  const departments = await fetchDepartments();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search departments..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>

      {departments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No departments found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
