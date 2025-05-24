# frozen_string_literal: true

# :nodoc:
class Course < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :department
  has_many :student_courses, dependent: :destroy
  has_many :teachers, dependent: :destroy
  has_many :students, through: :student_courses
  has_many :fees, dependent: :destroy
  has_many :fee_types, through: :fees
  has_many :sessions, dependent: :destroy
  has_many :assignments, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :college_id }
  validates :credits, presence: true
end
