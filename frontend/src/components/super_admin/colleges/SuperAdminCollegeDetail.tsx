'use client';

import { fetchSuperAdminCollege } from '@/lib/super_admins/colleges';
import { SuperAdminCollegeInfo } from './SuperAdminCollegeInfo';
import { SuperAdminCollegeUsers } from './SuperAdminCollegeUsers';

interface SuperAdminCollegeDetailProps {
  collegeId: string;
}

export async function SuperAdminCollegeDetail({ collegeId }: SuperAdminCollegeDetailProps) {
  const college = await fetchSuperAdminCollege(collegeId);

  return (
    <div className="space-y-6">
      <SuperAdminCollegeInfo college={college} />
      <SuperAdminCollegeUsers collegeId={collegeId} />
    </div>
  );
}
