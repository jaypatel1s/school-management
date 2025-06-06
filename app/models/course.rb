# frozen_string_literal: true

class Course < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :department
  has_many :student_courses
  has_many :students, through: :student_courses
  has_one :teacher, dependent: :destroy
  has_many :course_enrollments
  has_many :fees, dependent: :destroy
  has_many :fee_types, through: :fees
  has_many :sessions, dependent: :destroy
  has_many :assignments

  validates :name, presence: true, uniqueness: { scope: :college_id }
  validates :credits, presence: true
end
