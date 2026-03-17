import { fetchAdmissions } from '@/lib/principals/admissions';
import { AdmissionCard } from './AdmissionCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function AdmissionsList() {
  const admissions = await fetchAdmissions();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search admissions..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admissions.map((admission) => (
          <AdmissionCard key={admission.id} admission={admission} />
        ))}
      </div>

      {admissions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No admissions found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
