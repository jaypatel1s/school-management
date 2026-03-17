export function TeacherCourses({ teacherId }: { teacherId: string }) {
  // Mock data - replace with actual API call
  const courses = [
    { id: 1, name: 'Mathematics 101', code: 'MATH101', students: 30 },
    { id: 2, name: 'Physics 101', code: 'PHYS101', students: 25 },
    { id: 3, name: 'Chemistry 101', code: 'CHEM101', students: 28 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Courses</h3>
      
      <div className="space-y-3">
        {courses.map((course) => (
          <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{course.name}</h4>
              <p className="text-sm text-gray-600">{course.code}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-600">{course.students} students</span>
            </div>
          </div>
        ))}
        
        {courses.length === 0 && (
          <p className="text-gray-500 text-center py-4">No courses assigned</p>
        )}
      </div>
    </div>
  );
}
