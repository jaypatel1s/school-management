# frozen_string_literal: true

# :nodoc:
class AdmissionPayment < ApplicationRecord
  belongs_to :admission_application
  belongs_to :semester
  has_many :admission_receipts, dependent: :destroy

  # Payment mode: online/offline
  enum :payment_mode, { online: 0, offline: 1 }

  # Payment status: pending/paid/failed
  enum :payment_status, { pending: 'pending', paid: 'paid', failed: 'failed' }

  # Validations
  validates :amount, numericality: { greater_than: 0 }
  validates :payment_status, presence: true
  validates :payment_mode, presence: true
end
