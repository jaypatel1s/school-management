'use client';

import { useState } from 'react';
import { AttendanceCreateData, AttendanceUpdateData } from '@/types/principals';

interface AttendanceFormProps {
  initialData?: Partial<AttendanceCreateData>;
  onSubmit: (data: AttendanceCreateData | AttendanceUpdateData) => Promise<any>;
  submitText: string;
}

export function AttendanceForm({ initialData = {}, onSubmit, submitText }: AttendanceFormProps) {
  const [formData, setFormData] = useState<AttendanceCreateData>({
    course_id: initialData.course_id || '',
    date: initialData.date || '',
    session: initialData.session || '',
    teacher_id: initialData.teacher_id || '',
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
          <label htmlFor="course_id" className="block text-sm font-medium text-gray-700 mb-2">
            Course *
          </label>
          <select
            id="course_id"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Course</option>
            <option value="1">Mathematics 101</option>
            <option value="2">Physics 101</option>
            <option value="3">Chemistry 101</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="session" className="block text-sm font-medium text-gray-700 mb-2">
            Session *
          </label>
          <input
            type="text"
            id="session"
            name="session"
            value={formData.session}
            onChange={handleChange}
            required
            placeholder="e.g., Morning, Afternoon"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700 mb-2">
            Teacher *
          </label>
          <select
            id="teacher_id"
            name="teacher_id"
            value={formData.teacher_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Teacher</option>
            <option value="1">John Doe</option>
            <option value="2">Jane Smith</option>
            <option value="3">Mike Johnson</option>
          </select>
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
