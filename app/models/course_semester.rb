# frozen_string_literal: true

# :nodoc:
class CourseSemester < ApplicationRecord
  belongs_to :course
  belongs_to :academic_year
  belongs_to :semester
end
