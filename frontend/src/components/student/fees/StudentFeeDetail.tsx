'use client';

import { fetchStudentFee } from '@/lib/students/fees';
import { StudentFeeInfo } from './StudentFeeInfo';

interface StudentFeeDetailProps {
  feeId: string;
}

export async function StudentFeeDetail({ feeId }: StudentFeeDetailProps) {
  const fee = await fetchStudentFee(feeId);

  return (
    <div className="space-y-6">
      <StudentFeeInfo fee={fee} />
    </div>
  );
}
