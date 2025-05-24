# frozen_string_literal: true

# :nodoc:
class Department < ApplicationRecord
  include Sluggable

  belongs_to :college
  has_many :courses, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_one :teacher, dependent: :destroy

  validates :name, presence: true
end
