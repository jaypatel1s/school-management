class Classroom < ApplicationRecord
  include Sluggable

  belongs_to :college
  has_many :classroom_subjects
  has_many :subjects, through: :classroom_subjects
  has_many :teacher_classrooms
  has_many :teachers, through: :teacher_classrooms, source: :user
end
