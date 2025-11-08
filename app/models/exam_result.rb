# frozen_string_literal: true

class ExamResult < ApplicationRecord
  belongs_to :college
  belongs_to :exam
  belongs_to :student
  belongs_to :exam_attendance

  belongs_to :evaluated_by_teacher, class_name: 'Teacher'

  validates :marks_obtained, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :student_id, uniqueness: { scope: :exam_id, message: 'already has a result recorded for this exam.' }

  before_save :calculate_grade_and_status

  def percentage
    return 0 unless exam.max_marks&.positive? && marks_obtained.present?

    (marks_obtained.to_f / exam.max_marks) * 100
  end

  def calculate_grade_and_status
    perc = percentage
    self.passed = perc >= 40

    # 3. Set Grade
    self.grade = case perc
                 when 90..100 then 'A+'
                 when 80..89  then 'A'
                 when 70..79  then 'B'
                 when 60..69  then 'C'
                 when 50..59  then 'D'
                 when 40..49  then 'E'
                 else 'F'
                 end
  end
end
