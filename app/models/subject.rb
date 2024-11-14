class Subject < ApplicationRecord
  include Sluggable

  belongs_to :college

  has_many :teacher_subjects, dependent: :destroy
  has_many :users, through: :teacher_subjects

  accepts_nested_attributes_for :teacher_subjects, reject_if: :all_blank, allow_destroy: true
end
