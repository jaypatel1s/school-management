'use client';

import { useState } from 'react';
import { BulkAttendanceData } from '@/types/teachers';

export function TeacherBulkAttendanceForm() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', roll_number: 'CS001', present: true },
    { id: 2, name: 'Jane Smith', roll_number: 'CS002', present: true },
    { id: 3, name: 'Mike Johnson', roll_number: 'CS003', present: false },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const attendanceData: BulkAttendanceData = {
      attendances: students.map(student => ({
        student_id: student.id,
        date: selectedDate,
        present: student.present,
        notes: ''
      }))
    };

    try {
      // Call bulkMarkAttendance API
      console.log('Submitting attendance:', attendanceData);
      // Handle success
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  const toggleAttendance = (studentId: number) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, present: !student.present }
        : student
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
              Course *
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Course</option>
              <option value="math101">Mathematics 101</option>
              <option value="physics101">Physics 101</option>
              <option value="chemistry101">Chemistry 101</option>
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mark Attendance</h3>
          <div className="space-y-2">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">{student.name}</span>
                  <span className="text-sm text-gray-600 ml-2">{student.roll_number}</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleAttendance(student.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    student.present
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {student.present ? 'Present' : 'Absent'}
                </button>
              </div>
            ))}
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Mark Attendance
          </button>
        </div>
      </form>
    </div>
  );
}
