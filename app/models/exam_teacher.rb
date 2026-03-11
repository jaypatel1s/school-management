# frozen_string_literal: true

# :nodoc:
class ExamTeacher < ApplicationRecord
  belongs_to :exam
  belongs_to :teacher
  
  validates :exam_id, uniqueness: { scope: :teacher_id }
  validates :role, presence: true
  
  enum :role, { invigilator: 0, grader: 1, coordinator: 2 }
end
