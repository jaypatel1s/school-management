class Department < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :head, class_name: 'User', foreign_key: 'head_id' # The head of the department (user)
  has_many :courses

  validates :name, presence: true
end
