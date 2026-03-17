export function AssignmentSubmissions({ assignmentId }: { assignmentId: string }) {
  // Mock data - replace with actual API call
  const submissions = [
    {
      id: 1,
      student: { name: 'John Doe', roll_number: 'CS001' },
      submitted_at: '2024-01-15',
      status: 'Submitted',
      grade: 'A'
    },
    {
      id: 2,
      student: { name: 'Jane Smith', roll_number: 'CS002' },
      submitted_at: '2024-01-16',
      status: 'Submitted',
      grade: 'B+'
    },
    {
      id: 3,
      student: { name: 'Mike Johnson', roll_number: 'CS003' },
      submitted_at: null,
      status: 'Pending',
      grade: null
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Submissions</h3>
      
      <div className="space-y-3">
        {submissions.map((submission) => (
          <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{submission.student.name}</h4>
              <p className="text-sm text-gray-600">{submission.student.roll_number}</p>
            </div>
            <div className="text-right">
              <span className={`text-xs px-2 py-1 rounded-full ${
                submission.status === 'Submitted' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {submission.status}
              </span>
              {submission.submitted_at && (
                <p className="text-xs text-gray-500 mt-1">{submission.submitted_at}</p>
              )}
              {submission.grade && (
                <p className="text-sm font-medium text-blue-600 mt-1">Grade: {submission.grade}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
