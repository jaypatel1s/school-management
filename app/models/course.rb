# frozen_string_literal: true

# :nodoc:
class Course < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :department
  has_many :course_semesters, dependent: :destroy
  has_many :student_courses, dependent: :destroy
  has_many :students, through: :student_courses
  has_one :teacher, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_many :exams, dependent: :nullify

  accepts_nested_attributes_for :course_semesters, allow_destroy: true, reject_if: :all_blank

  validates :name, presence: true, uniqueness: { scope: :college_id }
  validates :credits, presence: true
end
