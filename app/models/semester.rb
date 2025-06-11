# frozen_string_literal: true

# :nodoc:
class Semester < ApplicationRecord
  include Sluggable

  belongs_to :college
  has_many :courses, dependent: :destroy
end
