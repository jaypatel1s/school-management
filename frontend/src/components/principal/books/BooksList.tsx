import { fetchBooks } from '@/lib/principals/books';
import { BookCard } from './BookCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';

export async function BooksList() {
  const books = await fetchBooks();

  return (
    <div className="space-y-6">
      <SearchFilter placeholder="Search books..." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No books found</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
