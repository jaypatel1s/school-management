# frozen_string_literal: true

# :nodoc:
class StudentFee < ApplicationRecord
  belongs_to :college
  belongs_to :student, class_name: 'Student'
  belongs_to :fee_structure
  has_many :fee_payments, dependent: :destroy

  validates :due_date, presence: true

  enum :status, { unpaid: 'unpaid', partial: 'partial', paid: 'paid', overdue: 'overdue' }
end
