class Attendance < ApplicationRecord
  belongs_to :user
  belongs_to :session

  enum status: { present: 0, absent: 1, late: 2 }
  validates :status, presence: true

end
