import { BookIssue } from '@/types/principals';

interface BookIssueInfoProps {
  issue: BookIssue;
}

export function BookIssueInfo({ issue }: BookIssueInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Book Issue Details</h2>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-6">
          <div className="w-32 h-40 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
            <span className="text-4xl text-gray-600">📚</span>
          </div>
          
          <div className="flex-1">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{issue.book.title}</h3>
                <p className="text-gray-600">by {issue.book.author}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Student</p>
                  <p className="font-medium">{issue.student.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Student Roll Number</p>
                  <p className="font-medium">{issue.student.roll_number}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Issue Date</p>
                  <p className="font-medium">{issue.issue_date}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">{issue.due_date}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    issue.status === 'Returned' 
                      ? 'bg-green-100 text-green-800' 
                      : issue.status === 'Issued'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {issue.status}
                  </span>
                </div>
                {issue.return_date && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Return Date</p>
                    <p className="font-medium">{issue.return_date}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
