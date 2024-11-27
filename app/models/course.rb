class Course < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :department
  belongs_to :teacher, class_name: 'User'

  validates :name, presence: true
  validates :credits, presence: true
end
