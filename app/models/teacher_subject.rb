class TeacherSubject < ApplicationRecord
  belongs_to :user
  belongs_to :subject
  belongs_to :college

  has_many :teacher_classrooms, dependent: :destroy
  has_many :classrooms, through: :teacher_classrooms

  accepts_nested_attributes_for :teacher_classrooms, reject_if: :all_blank, allow_destroy: true
end
