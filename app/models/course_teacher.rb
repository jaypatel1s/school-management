# frozen_string_literal: true

# :nodoc:
class CourseTeacher < ApplicationRecord
  belongs_to :course
  belongs_to :teacher
  
  validates :course_id, uniqueness: { scope: :teacher_id }
end
