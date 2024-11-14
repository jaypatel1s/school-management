class Subject < ApplicationRecord
  include Sluggable

  belongs_to :college
  has_many :teacher_classrooms
  has_many :classrooms, through: :teacher_classrooms
  has_many :classroom_subjects
  has_many :classrooms, through: :classroom_subjects

  accepts_nested_attributes_for :classroom_subjects, reject_if: :all_blank, allow_destroy: true
  accepts_nested_attributes_for :teacher_classrooms, reject_if: :all_blank, allow_destroy: true
end
