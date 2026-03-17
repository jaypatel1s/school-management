import { Suspense } from 'react';
import { StudentBookIssuesList } from './StudentBookIssuesList';
import { StudentBookIssuesListSkeleton } from './StudentBookIssuesListSkeleton';

interface StudentBookIssuesProps {
  studentId: string;
}

export function StudentBookIssues({ studentId }: StudentBookIssuesProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Issues</h3>
      
      <Suspense fallback={<StudentBookIssuesListSkeleton />}>
        <StudentBookIssuesList studentId={studentId} />
      </Suspense>
    </div>
  );
}
