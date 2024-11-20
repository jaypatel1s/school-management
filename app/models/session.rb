class Session < ApplicationRecord
  belongs_to :classroom
  has_many :attendances, dependent: :destroy
  has_many :students, through: :attendances

  validates :date, presence: true

end
