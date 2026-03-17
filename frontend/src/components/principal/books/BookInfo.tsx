import { Book } from '@/types/principals';

interface BookInfoProps {
  book: Book;
}

export function BookInfo({ book }: BookInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-start space-x-6">
        <div className="w-32 h-40 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
          <span className="text-4xl text-gray-600">📚</span>
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Book Information</h2>
          
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
                <p className="text-sm text-gray-500">Total Copies</p>
                <p className="font-medium">{book.total_copies}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Available Copies</p>
                <p className="font-medium">{book.available_copies}</p>
              </div>
            </div>

            {book.description && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="text-gray-900">{book.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
