'use client';

import { useState } from 'react';
import { BookIssueCreateData, BookIssueUpdateData } from '@/types/principals';

interface BookIssueFormProps {
  initialData?: Partial<BookIssueCreateData>;
  onSubmit: (data: BookIssueCreateData | BookIssueUpdateData) => Promise<any>;
  submitText: string;
}

export function BookIssueForm({ initialData = {}, onSubmit, submitText }: BookIssueFormProps) {
  const [formData, setFormData] = useState<BookIssueCreateData>({
    book_id: initialData.book_id || '',
    student_id: initialData.student_id || '',
    issue_date: initialData.issue_date || '',
    due_date: initialData.due_date || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit(formData);
    } catch (err) {
      setError('Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="book_id" className="block text-sm font-medium text-gray-700 mb-2">
            Book *
          </label>
          <select
            id="book_id"
            name="book_id"
            value={formData.book_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Book</option>
            <option value="1">Mathematics Textbook</option>
            <option value="2">Physics Textbook</option>
            <option value="3">Chemistry Textbook</option>
          </select>
        </div>

        <div>
          <label htmlFor="student_id" className="block text-sm font-medium text-gray-700 mb-2">
            Student *
          </label>
          <select
            id="student_id"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Student</option>
            <option value="1">John Doe (CS001)</option>
            <option value="2">Jane Smith (CS002)</option>
            <option value="3">Mike Johnson (CS003)</option>
          </select>
        </div>

        <div>
          <label htmlFor="issue_date" className="block text-sm font-medium text-gray-700 mb-2">
            Issue Date *
          </label>
          <input
            type="date"
            id="issue_date"
            name="issue_date"
            value={formData.issue_date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-2">
            Due Date *
          </label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Submitting...' : submitText}
        </button>
      </div>
    </form>
  );
}
