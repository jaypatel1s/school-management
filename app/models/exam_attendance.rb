# app/models/exam_attendance.rb
# frozen_string_literal: true

class ExamAttendance < ApplicationRecord
  belongs_to :exam
  belongs_to :student

  validates :student_id, uniqueness: { scope: :exam_id, message: "already has an attendance record for this exam" }

  # Status: 0 = present, 1 = absent
  enum status: { present: 0, absent: 1 }

  # Scopes for easy querying
  scope :present_students, -> { where(status: :present) }
  scope :absent_students, -> { where(status: :absent) }
end
