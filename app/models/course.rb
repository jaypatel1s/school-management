# frozen_string_literal: true

class Course < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :semester
  belongs_to :department
  belongs_to :academic_year
  has_many :student_courses
  has_many :students, through: :student_courses
  has_one :teacher, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :assignments, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :college_id }
  validates :credits, presence: true
end
