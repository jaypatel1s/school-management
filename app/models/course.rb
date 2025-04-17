# frozen_string_literal: true

class Course < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :department
  has_many :student_courses
  has_many :students, through: :student_courses
  has_many :course_enrollments
  has_many :fees, dependent: :destroy
  has_many :fee_types, through: :fees
  has_many :sessions, dependent: :destroy
  has_many :students, through: :course_enrollments, source: :user

  validates :name, presence: true
  validates :credits, presence: true
end
