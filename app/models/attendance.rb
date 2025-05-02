# frozen_string_literal: true

# :nodoc:
class Attendance < ApplicationRecord
  belongs_to :college
  belongs_to :department
  belongs_to :session
  belongs_to :student

  enum :status, { present: 0, absent: 1, late: 2 }
  validates :status, presence: true
end
