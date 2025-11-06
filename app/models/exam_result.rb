# frozen_string_literal: true

class ExamResult < ApplicationRecord
  belongs_to :college
  belongs_to :exam
  belongs_to :student

  belongs_to :evaluated_by_teacher, class_name: 'Teacher'

  validates :marks_obtained, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :student_id, uniqueness: { scope: :exam_id, message: 'already has a result recorded for this exam.' }

  def percentage
    return 0 unless exam.max_marks&.positive?

    (marks_obtained.to_f / exam.max_marks) * 100
  end

  before_save :set_passed_status

  def set_passed_status
    self.passed = percentage >= 40
  end
end
