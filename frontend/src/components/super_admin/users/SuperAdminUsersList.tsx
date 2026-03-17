import { fetchSuperAdminUsers } from '@/lib/super_admins/users';
import { SuperAdminUserCard } from './SuperAdminUserCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function SuperAdminUsersList() {
  const users = await fetchSuperAdminUsers();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search users..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <SuperAdminUserCard key={user.id} user={user} />
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No users found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
