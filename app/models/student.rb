class Student < ApplicationRecord
  belongs_to :college
  belongs_to :user
  has_many :student_courses
  has_many :courses, through: :student_courses

  enum status: {active: 0 ,deactive: 1}
end
