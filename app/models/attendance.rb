class Attendance < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :session
  belongs_to :student, class_name: 'User'

  validates :student_id, uniqueness: { scope: :session_id }
  enum status: { present: 0, absent: 1, late: 2 }

end
