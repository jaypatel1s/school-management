# frozen_string_literal: true

# :nodoc:
class Classroom < ApplicationRecord
  include Sluggable

  belongs_to :college

  has_many :teacher_classrooms, dependent: :destroy
  has_many :teacher_subjects, through: :teacher_classrooms
end
