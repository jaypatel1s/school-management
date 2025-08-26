# frozen_string_literal: true

# :nodoc:
class Semester < ApplicationRecord
  include Sluggable

  belongs_to :college
  has_many :course_semesters, dependent: :destroy
end
