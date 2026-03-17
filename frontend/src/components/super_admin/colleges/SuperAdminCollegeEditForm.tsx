import { fetchSuperAdminCollege, updateSuperAdminCollege } from '@/lib/super_admins/colleges';
import { SuperAdminCollegeForm } from './SuperAdminCollegeForm';

interface SuperAdminCollegeEditFormProps {
  collegeId: string;
}

export async function SuperAdminCollegeEditForm({ collegeId }: SuperAdminCollegeEditFormProps) {
  const college = await fetchSuperAdminCollege(collegeId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateSuperAdminCollege(collegeId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <SuperAdminCollegeForm 
        initialData={college} 
        onSubmit={handleUpdate}
        submitText="Update College"
      />
    </div>
  );
}
