# frozen_string_literal: true

# :nodoc:
class Department < ApplicationRecord
  include Sluggable

  belongs_to :college
  has_many :academic_years, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_one :teacher, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :college_id }
end
