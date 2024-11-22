class Session < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :classroom
  has_many :attendances, dependent: :destroy
  has_many :students, through: :attendances

  validates :date, presence: true

end
