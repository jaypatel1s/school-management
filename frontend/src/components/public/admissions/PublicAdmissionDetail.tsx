'use client';

import { fetchPublicAdmission } from '@/lib/public/admissions';
import { PublicAdmissionInfo } from './PublicAdmissionInfo';
import { PublicAdmissionForm } from './PublicAdmissionForm';

interface PublicAdmissionDetailProps {
  admissionId: string;
}

export async function PublicAdmissionDetail({ admissionId }: PublicAdmissionDetailProps) {
  const admission = await fetchPublicAdmission(admissionId);

  return (
    <div className="space-y-6">
      <PublicAdmissionInfo admission={admission} />
      <PublicAdmissionForm admissionId={admissionId} />
    </div>
  );
}
