import { StudentExam } from '@/types/students';

interface StudentExamInfoProps {
  exam: StudentExam;
}

export function StudentExamInfo({ exam }: StudentExamInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Exam Details</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{exam.title}</h3>
          <p className="text-gray-600 mt-2">{exam.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Course</p>
            <p className="font-medium">{exam.course}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Exam Date</p>
            <p className="font-medium">{exam.exam_date}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-medium">{exam.duration}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Points</p>
            <p className="font-medium">{exam.total_points}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Status</p>
            <span className={`px-2 py-1 rounded-full text-sm ${
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
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Score</p>
              <p className="font-medium">{exam.score}/{exam.total_points}</p>
            </div>
          )}
        </div>

        {exam.exam_link && (
          <div className="mt-4 pt-4 border-t">
            <a 
              href={exam.exam_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Take Exam →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
