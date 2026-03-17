import { fetchSuperAdminUser, updateSuperAdminUser } from '@/lib/super_admins/users';
import { SuperAdminUserForm } from './SuperAdminUserForm';

interface SuperAdminUserEditFormProps {
  userId: string;
}

export async function SuperAdminUserEditForm({ userId }: SuperAdminUserEditFormProps) {
  const user = await fetchSuperAdminUser(userId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateSuperAdminUser(userId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <SuperAdminUserForm 
        initialData={user} 
        onSubmit={handleUpdate}
        submitText="Update User"
      />
    </div>
  );
}
