export async function StudentBookIssuesList({ studentId }: { studentId: string }) {
  // Mock data - replace with actual API call
  const bookIssues = [
    {
      id: 1,
      book: { title: 'Introduction to Physics', author: 'John Doe' },
      issue_date: '2024-01-10',
      due_date: '2024-01-24',
      return_date: null,
      status: 'Issued'
    },
    {
      id: 2,
      book: { title: 'Calculus Made Easy', author: 'Jane Smith' },
      issue_date: '2024-01-05',
      due_date: '2024-01-19',
      return_date: '2024-01-18',
      status: 'Returned'
    },
  ];

  return (
    <div className="space-y-3">
      {bookIssues.map((issue) => (
        <div key={issue.id} className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">{issue.book.title}</h4>
            <span className={`text-xs px-2 py-1 rounded-full ${
              issue.status === 'Returned' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {issue.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">by {issue.book.author}</p>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Issued: {issue.issue_date}</span>
            <span>Due: {issue.due_date}</span>
          </div>
          {issue.return_date && (
            <p className="text-xs text-green-600 mt-1">Returned: {issue.return_date}</p>
          )}
        </div>
      ))}
      
      {bookIssues.length === 0 && (
        <p className="text-gray-500 text-center py-4">No books issued</p>
      )}
    </div>
  );
}
