import { StudentExam } from '@/types/students';
import Link from 'next/link';

interface StudentExamCardProps {
  exam: StudentExam;
}

export function StudentExamCard({ exam }: StudentExamCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">{exam.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{exam.course}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Exam Date:</span>
          <span className="text-gray-900">{exam.exam_date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Duration:</span>
          <span className="text-gray-900">{exam.duration}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Total Points:</span>
          <span className="text-gray-900">{exam.total_points}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            exam.status === 'Completed' 
              ? 'bg-green-100 text-green-800' 
              : exam.status === 'In Progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {exam.status}
          </span>
        </div>
        {exam.score !== null && (
          <div className="flex justify-between">
            <span className="text-gray-500">Score:</span>
            <span className="text-gray-900">{exam.score}/{exam.total_points}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/student/exams/${exam.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
