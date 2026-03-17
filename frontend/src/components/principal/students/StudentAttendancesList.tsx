export async function StudentAttendancesList({ studentId }: { studentId: string }) {
  // Mock data - replace with actual API call
  const attendances = [
    { id: 1, date: '2024-01-15', status: 'Present', course: 'Mathematics 101' },
    { id: 2, date: '2024-01-16', status: 'Present', course: 'Physics 101' },
    { id: 3, date: '2024-01-17', status: 'Absent', course: 'Chemistry 101' },
    { id: 4, date: '2024-01-18', status: 'Present', course: 'Mathematics 101' },
    { id: 5, date: '2024-01-19', status: 'Present', course: 'Physics 101' },
  ];

  const presentCount = attendances.filter(a => a.status === 'Present').length;
  const attendanceRate = Math.round((presentCount / attendances.length) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Attendance Rate</span>
        <span className="text-lg font-semibold text-green-600">{attendanceRate}%</span>
      </div>
      
      <div className="space-y-2">
        {attendances.map((attendance) => (
          <div key={attendance.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                attendance.status === 'Present' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm font-medium">{attendance.date}</span>
              <span className="text-sm text-gray-600">{attendance.course}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              attendance.status === 'Present' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {attendance.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
