# frozen_string_literal: true

class College < ApplicationRecord
  include Sluggable

  has_many :users, dependent: :destroy
  has_many :departments, dependent: :destroy
  has_many :courses, dependent: :destroy
  has_many :course_enrollments, through: :courses # Enrollments via Courses
  has_many :fees, dependent: :destroy
  has_many :fee_types, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :attendances, dependent: :destroy
end
