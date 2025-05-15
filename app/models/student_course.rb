# frozen_string_literal: true

# :nodoc:
class StudentCourse < ApplicationRecord
  belongs_to :student
  belongs_to :course
end
