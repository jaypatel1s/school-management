import { fetchSuperAdminColleges } from '@/lib/super_admins/colleges';
import { SuperAdminCollegeCard } from './SuperAdminCollegeCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function SuperAdminCollegesList() {
  const colleges = await fetchSuperAdminColleges();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search colleges..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <SuperAdminCollegeCard key={college.id} college={college} />
        ))}
      </div>

      {colleges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No colleges found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
