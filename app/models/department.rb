class Department < ApplicationRecord
  include Sluggable

  belongs_to :college
  has_many :courses
  has_one :teacher, dependent:  :destroy

  validates :name, presence: true
end
