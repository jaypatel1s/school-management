# app/models/exam_attendance.rb
# frozen_string_literal: true

class ExamAttendance < ApplicationRecord
  belongs_to :exam
  belongs_to :student
  has_one :exam_result, dependent: :destroy

  validates :student_id, uniqueness: { scope: :exam_id, message: 'already has an attendance record for this exam' }

  # Status: 0 = present, 1 = absent
  enum :status, { present: 0, absent: 1 }

  # Scopes for easy querying
  scope :present_students, -> { where(status: :present) }
  scope :absent_students, -> { where(status: :absent) }

  after_update :destroy_exam_result_if_absent

  def destroy_exam_result_if_absent
    return unless saved_change_to_status? && absent?

    # Find and destroy the associated exam result, if one exists.
    # This cleans up the data automatically.
    exam_result&.destroy
  end
end
