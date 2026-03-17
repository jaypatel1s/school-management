export function PublicCollegeCourses({ collegeId }: { collegeId: string }) {
  // Mock data - replace with actual API call
  const courses = [
    { id: 1, name: 'Computer Science', code: 'CS101', duration: '4 years' },
    { id: 2, name: 'Business Administration', code: 'BA101', duration: '3 years' },
    { id: 3, name: 'Engineering', code: 'ENG101', duration: '4 years' },
    { id: 4, name: 'Medicine', code: 'MED101', duration: '5 years' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Courses</h3>
      
      <div className="space-y-3">
        {courses.map((course) => (
          <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{course.name}</h4>
              <p className="text-sm text-gray-600">{course.code}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-600">{course.duration}</span>
            </div>
          </div>
        ))}
        
        {courses.length === 0 && (
          <p className="text-gray-500 text-center py-4">No courses available</p>
        )}
      </div>
    </div>
  );
}
