import { fetchBook, updateBook } from '@/lib/principals/books';
import { BookForm } from './BookForm';

interface BookEditFormProps {
  bookId: string;
}

export async function BookEditForm({ bookId }: BookEditFormProps) {
  const book = await fetchBook(bookId);

  async function handleUpdate(data: any) {
    'use server';
    return await updateBook(bookId, data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <BookForm 
        initialData={book} 
        onSubmit={handleUpdate}
        submitText="Update Book"
      />
    </div>
  );
}
