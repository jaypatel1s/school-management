export function SuperAdminCollegeUsers({ collegeId }: { collegeId: string }) {
  // Mock data - replace with actual API call
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Principal' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Student' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">College Users</h3>
      
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{user.name}</h4>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded-full text-xs ${
                user.role === 'Principal' 
                  ? 'bg-purple-100 text-purple-800' 
                  : user.role === 'Teacher'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {user.role}
              </span>
            </div>
          </div>
        ))}
        
        {users.length === 0 && (
          <p className="text-gray-500 text-center py-4">No users found</p>
        )}
      </div>
    </div>
  );
}
