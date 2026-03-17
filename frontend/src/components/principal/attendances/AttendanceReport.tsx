export function AttendanceReport() {
  // Mock data - replace with actual API call
  const reportData = {
    total_sessions: 120,
    total_attendance: 85,
    monthly_stats: [
      { month: 'January', sessions: 20, attendance_rate: 88 },
      { month: 'February', sessions: 18, attendance_rate: 83 },
      { month: 'March', sessions: 22, attendance_rate: 90 },
    ],
    course_stats: [
      { course: 'Mathematics 101', attendance_rate: 92 },
      { course: 'Physics 101', attendance_rate: 85 },
      { course: 'Chemistry 101', attendance_rate: 78 },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Sessions</h3>
          <p className="text-2xl font-bold text-gray-900">{reportData.total_sessions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Overall Attendance</h3>
          <p className="text-2xl font-bold text-blue-600">{reportData.total_attendance}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Average per Session</h3>
          <p className="text-2xl font-bold text-green-600">45</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Statistics</h3>
        <div className="space-y-3">
          {reportData.monthly_stats.map((stat) => (
            <div key={stat.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{stat.month}</h4>
                <p className="text-sm text-gray-600">{stat.sessions} sessions</p>
              </div>
              <span className={`text-sm font-medium ${
                stat.attendance_rate >= 90 ? 'text-green-600' : 
                stat.attendance_rate >= 80 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {stat.attendance_rate}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course-wise Attendance</h3>
        <div className="space-y-3">
          {reportData.course_stats.map((stat) => (
            <div key={stat.course} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{stat.course}</h4>
              </div>
              <span className={`text-sm font-medium ${
                stat.attendance_rate >= 90 ? 'text-green-600' : 
                stat.attendance_rate >= 80 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {stat.attendance_rate}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
