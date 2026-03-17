import { fetchDepartment, updateDepartment } from '@/lib/principals/departments';
import { DepartmentForm } from './DepartmentForm';

interface DepartmentEditFormProps {
  departmentId: string;
}

export async function DepartmentEditForm({ departmentId }: DepartmentEditFormProps) {
  const department = await fetchDepartment(departmentId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateDepartment(departmentId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <DepartmentForm 
        initialData={department} 
        onSubmit={handleUpdate}
        submitText="Update Department"
      />
    </div>
  );
}
