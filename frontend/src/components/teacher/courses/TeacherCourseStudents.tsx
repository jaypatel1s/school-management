export function TeacherCourseStudents({ courseId }: { courseId: string }) {
  // Mock data - replace with actual API call
  const students = [
    { id: 1, name: 'John Doe', roll_number: 'CS001', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', roll_number: 'CS002', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', roll_number: 'CS003', email: 'mike@example.com' },
    { id: 4, name: 'Sarah Williams', roll_number: 'CS004', email: 'sarah@example.com' },
    { id: 5, name: 'Tom Brown', roll_number: 'CS005', email: 'tom@example.com' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrolled Students</h3>
      
      <div className="space-y-3">
        {students.map((student) => (
          <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{student.name}</h4>
              <p className="text-sm text-gray-600">{student.roll_number}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{student.email}</p>
              <button className="text-xs text-blue-600 hover:text-blue-800 mt-1">
                View Attendance
              </button>
            </div>
          </div>
        ))}
        
        {students.length === 0 && (
          <p className="text-gray-500 text-center py-4">No students enrolled</p>
        )}
      </div>
    </div>
  );
}
