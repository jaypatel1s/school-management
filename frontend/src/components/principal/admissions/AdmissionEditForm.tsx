import { fetchAdmission, updateAdmission } from '@/lib/principals/admissions';
import { AdmissionForm } from './AdmissionForm';

interface AdmissionEditFormProps {
  admissionId: string;
}

export async function AdmissionEditForm({ admissionId }: AdmissionEditFormProps) {
  const admission = await fetchAdmission(admissionId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateAdmission(admissionId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <AdmissionForm 
        initialData={admission} 
        onSubmit={handleUpdate}
        submitText="Update Admission"
      />
    </div>
  );
}
