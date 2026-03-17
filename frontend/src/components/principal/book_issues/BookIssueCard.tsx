import { BookIssue } from '@/types/principals';
import Link from 'next/link';

interface BookIssueCardProps {
  issue: BookIssue;
}

export function BookIssueCard({ issue }: BookIssueCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">
        <div className="w-16 h-20 bg-gray-200 rounded mx-auto mb-3 flex items-center justify-center">
          <span className="text-2xl text-gray-600">📚</span>
        </div>
        <h3 className="font-semibold text-gray-900 text-lg text-center">{issue.book.title}</h3>
        <p className="text-gray-600 text-sm text-center mt-1">{issue.book.author}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Student:</span>
          <span className="text-gray-900">{issue.student.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Issue Date:</span>
          <span className="text-gray-900">{issue.issue_date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Due Date:</span>
          <span className="text-gray-900">{issue.due_date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            issue.status === 'Returned' 
              ? 'bg-green-100 text-green-800' 
              : issue.status === 'Issued'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {issue.status}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/principal/book_issues/${issue.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium block text-center"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
