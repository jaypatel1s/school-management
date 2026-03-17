'use client';

import { Suspense } from 'react';
import { BookEditForm } from '@/components/principal/books/BookEditForm';
import { BookEditFormSkeleton } from '@/components/principal/books/BookEditFormSkeleton';

export default function EditBookPage({ params }: { params: { slug: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
          <p className="text-gray-600">Update book information</p>
        </div>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          Cancel
        </button>
      </div>

      <Suspense fallback={<BookEditFormSkeleton />}>
        <BookEditForm bookSlug={params.slug} />
      </Suspense>
    </div>
  );
}
