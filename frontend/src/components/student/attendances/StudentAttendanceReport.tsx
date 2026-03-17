export function StudentAttendanceReport() {
  // Mock data - replace with actual API call
  const reportData = {
    total_classes: 120,
    present_classes: 102,
    absent_classes: 18,
    attendance_rate: 85,
    monthly_stats: [
      { month: 'January', present: 22, absent: 3, rate: 88 },
      { month: 'February', present: 20, absent: 4, rate: 83 },
      { month: 'March', present: 18, absent: 2, rate: 90 },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Classes</h3>
          <p className="text-2xl font-bold text-gray-900">{reportData.total_classes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Present</h3>
          <p className="text-2xl font-bold text-green-600">{reportData.present_classes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Absent</h3>
          <p className="text-2xl font-bold text-red-600">{reportData.absent_classes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Attendance Rate</h3>
          <p className="text-2xl font-bold text-blue-600">{reportData.attendance_rate}%</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Statistics</h3>
        <div className="space-y-3">
          {reportData.monthly_stats.map((stat) => (
            <div key={stat.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{stat.month}</h4>
                <p className="text-sm text-gray-600">Present: {stat.present}, Absent: {stat.absent}</p>
              </div>
              <span className={`text-sm font-medium ${
                stat.rate >= 90 ? 'text-green-600' : 
                stat.rate >= 80 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {stat.rate}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
