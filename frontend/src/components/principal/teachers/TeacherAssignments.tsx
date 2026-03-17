export function TeacherAssignments({ teacherId }: { teacherId: string }) {
  // Mock data - replace with actual API call
  const assignments = [
    { id: 1, title: 'Math Quiz 1', course: 'Mathematics 101', due_date: '2024-01-20', submissions: 25 },
    { id: 2, title: 'Physics Lab Report', course: 'Physics 101', due_date: '2024-01-22', submissions: 20 },
    { id: 3, title: 'Chemistry Assignment', course: 'Chemistry 101', due_date: '2024-01-25', submissions: 18 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignments</h3>
      
      <div className="space-y-3">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">{assignment.title}</h4>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {assignment.course}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Due: {assignment.due_date}</span>
              <span>{assignment.submissions} submissions</span>
            </div>
          </div>
        ))}
        
        {assignments.length === 0 && (
          <p className="text-gray-500 text-center py-4">No assignments created</p>
        )}
      </div>
    </div>
  );
}
