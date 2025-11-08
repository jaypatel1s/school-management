# frozen_string_literal: true

# :nodoc:
class Student < ApplicationRecord
  belongs_to :college
  belongs_to :user
  belongs_to :admission_application, optional: true

  has_many :student_courses, dependent: :destroy
  has_many :courses, through: :student_courses
  has_many :attendances, dependent: :destroy
  has_many :exam_attendances, dependent: :destroy
  has_many :exam_results, dependent: :destroy

  enum :status, { active: 0, deactive: 1 }
end
