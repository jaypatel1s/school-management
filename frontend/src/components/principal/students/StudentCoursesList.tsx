export async function StudentCoursesList({ studentId }: { studentId: string }) {
  // Mock data - replace with actual API call
  const courses = [
    { id: 1, name: 'Mathematics 101', code: 'MATH101', credits: 3 },
    { id: 2, name: 'Physics 101', code: 'PHYS101', credits: 4 },
    { id: 3, name: 'Chemistry 101', code: 'CHEM101', credits: 3 },
  ];

  return (
    <div className="space-y-3">
      {courses.map((course) => (
        <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">{course.name}</h4>
            <p className="text-sm text-gray-600">{course.code} • {course.credits} credits</p>
          </div>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            Active
          </span>
        </div>
      ))}
      
      {courses.length === 0 && (
        <p className="text-gray-500 text-center py-4">No courses enrolled</p>
      )}
    </div>
  );
}
