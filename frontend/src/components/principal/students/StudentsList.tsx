'use client';

import { fetchStudents } from '@/lib/principals/students';
import { StudentCard } from './StudentCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function StudentsList() {
  const students = await fetchStudents();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search students..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {students.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No students found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
