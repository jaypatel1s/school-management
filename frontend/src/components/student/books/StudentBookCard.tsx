import { StudentBook } from '@/types/students';
import Link from 'next/link';

interface StudentBookCardProps {
  book: StudentBook;
}

export function StudentBookCard({ book }: StudentBookCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">
        <div className="w-16 h-20 bg-gray-200 rounded mx-auto mb-3 flex items-center justify-center">
          <span className="text-2xl text-gray-600">📚</span>
        </div>
        <h3 className="font-semibold text-gray-900 text-lg text-center">{book.title}</h3>
        <p className="text-gray-600 text-sm text-center mt-1">{book.author}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">ISBN:</span>
          <span className="text-gray-900">{book.isbn}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Category:</span>
          <span className="text-gray-900">{book.category}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Available:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            book.available 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {book.available ? 'Yes' : 'No'}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link 
          href={`/student/books/${book.slug}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium block text-center"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
