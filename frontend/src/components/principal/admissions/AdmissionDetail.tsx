'use client';

import { fetchAdmission } from '@/lib/principals/admissions';
import { AdmissionInfo } from './AdmissionInfo';

interface AdmissionDetailProps {
  admissionId: string;
}

export async function AdmissionDetail({ admissionId }: AdmissionDetailProps) {
  const admission = await fetchAdmission(admissionId);

  return (
    <div className="space-y-6">
      <AdmissionInfo admission={admission} />
    </div>
  );
}
