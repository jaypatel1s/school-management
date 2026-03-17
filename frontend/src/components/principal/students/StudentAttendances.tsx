import { Suspense } from 'react';
import { StudentAttendancesList } from './StudentAttendancesList';
import { StudentAttendancesListSkeleton } from './StudentAttendancesListSkeleton';

interface StudentAttendancesProps {
  studentId: string;
}

export function StudentAttendances({ studentId }: StudentAttendancesProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Records</h3>
      
      <Suspense fallback={<StudentAttendancesListSkeleton />}>
        <StudentAttendancesList studentId={studentId} />
      </Suspense>
    </div>
  );
}
