'use client';

import { fetchDepartment } from '@/lib/principals/departments';
import { DepartmentInfo } from './DepartmentInfo';
import { DepartmentTeachers } from './DepartmentTeachers';
import { DepartmentCourses } from './DepartmentCourses';

interface DepartmentDetailProps {
  departmentId: string;
}

export async function DepartmentDetail({ departmentId }: DepartmentDetailProps) {
  const department = await fetchDepartment(departmentId);

  return (
    <div className="space-y-6">
      <DepartmentInfo department={department} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentTeachers departmentId={departmentId} />
        <DepartmentCourses departmentId={departmentId} />
      </div>
    </div>
  );
}
