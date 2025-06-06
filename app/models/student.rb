# frozen_string_literal: true

# :nodoc:
class Student < ApplicationRecord
  belongs_to :college
  belongs_to :user
  has_many :student_courses, dependent: :destroy
  has_many :courses, through: :student_courses
  has_many :attendances, dependent: :destroy

  enum :status, { active: 0, deactive: 1 }
end
