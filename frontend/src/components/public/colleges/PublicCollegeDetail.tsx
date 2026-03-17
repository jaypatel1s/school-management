'use client';

import { fetchPublicCollege } from '@/lib/public/colleges';
import { PublicCollegeInfo } from './PublicCollegeInfo';
import { PublicCollegeCourses } from './PublicCollegeCourses';

interface PublicCollegeDetailProps {
  collegeId: string;
}

export async function PublicCollegeDetail({ collegeId }: PublicCollegeDetailProps) {
  const college = await fetchPublicCollege(collegeId);

  return (
    <div className="space-y-6">
      <PublicCollegeInfo college={college} />
      <PublicCollegeCourses collegeId={collegeId} />
    </div>
  );
}
