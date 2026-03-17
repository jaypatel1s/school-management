export function DepartmentTeachers({ departmentId }: { departmentId: string }) {
  // Mock data - replace with actual API call
  const teachers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', specialization: 'Mathematics' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', specialization: 'Physics' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', specialization: 'Chemistry' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Teachers</h3>
      
      <div className="space-y-3">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{teacher.name}</h4>
              <p className="text-sm text-gray-600">{teacher.email}</p>
              <p className="text-xs text-gray-500">{teacher.specialization}</p>
            </div>
            <div className="text-right">
              <button className="text-xs text-blue-600 hover:text-blue-800">
                View Profile
              </button>
            </div>
          </div>
        ))}
        
        {teachers.length === 0 && (
          <p className="text-gray-500 text-center py-4">No teachers assigned</p>
        )}
      </div>
    </div>
  );
}
