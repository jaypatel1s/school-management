# frozen_string_literal: true

# :nodoc:
class Teacher < ApplicationRecord
  belongs_to :college
  belongs_to :department
  belongs_to :course
  belongs_to :user
  has_many :course_teachers, dependent: :destroy
  has_many :courses, through: :course_teachers
  has_many :assignments, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :exam_teachers, dependent: :destroy
  has_many :assigned_exams, through: :exam_teachers, source: :exam
end
