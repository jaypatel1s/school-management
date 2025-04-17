class Student < ApplicationRecord
  belongs_to :college
  has_many :student_courses
  has_many :courses, through: :student_courses
end
