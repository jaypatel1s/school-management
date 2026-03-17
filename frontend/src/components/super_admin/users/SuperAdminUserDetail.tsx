'use client';

import { fetchSuperAdminUser } from '@/lib/super_admins/users';
import { SuperAdminUserInfo } from './SuperAdminUserInfo';

interface SuperAdminUserDetailProps {
  userId: string;
}

export async function SuperAdminUserDetail({ userId }: SuperAdminUserDetailProps) {
  const user = await fetchSuperAdminUser(userId);

  return (
    <div className="space-y-6">
      <SuperAdminUserInfo user={user} />
    </div>
  );
}
