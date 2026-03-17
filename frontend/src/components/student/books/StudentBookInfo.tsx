import { StudentBook } from '@/types/students';

interface StudentBookInfoProps {
  book: StudentBook;
}

export function StudentBookInfo({ book }: StudentBookInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-start space-x-6">
        <div className="w-32 h-40 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
          <span className="text-4xl text-gray-600">📚</span>
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Book Details</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">ISBN</p>
                <p className="font-medium">{book.isbn}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{book.category}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Publisher</p>
                <p className="font-medium">{book.publisher}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Published Year</p>
                <p className="font-medium">{book.published_year}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Available</p>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  book.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {book.available ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Total Copies</p>
                <p className="font-medium">{book.total_copies}</p>
              </div>
            </div>

            {book.description && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="text-gray-900">{book.description}</p>
              </div>
            )}

            {book.available && (
              <div className="mt-4 pt-4 border-t">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Request Book
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
