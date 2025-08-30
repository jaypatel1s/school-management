# frozen_string_literal: true

# :nodoc:
class AdmissionApplication < ApplicationRecord
  include Sluggable

  belongs_to :admission
  belongs_to :college
  belongs_to :department
  belongs_to :course
  belongs_to :fee_structure

  has_many :admission_documents, dependent: :destroy
  has_many :document_types, through: :admission_documents
  has_many :admission_payments, dependent: :destroy
  has_many :admission_receipts, through: :admission_payments

  before_validation :generate_application_number, on: :create
  before_validation :generate_temporary_token, on: :create
  before_validation :set_expiry, on: :create

  validates :email, :application_number, :temporary_token, presence: true
  validates :application_number, :temporary_token, uniqueness: true
  validate :unique_application_per_combination

  enum :status, {
    document_upload_pending: 'document_upload_pending',
    under_review: 'under_review',
    documents_accepted: 'documents_accepted',
    payment_pending: 'payment_pending',
    admitted: 'admitted',
    rejected: 'rejected'
  }, default: 'document_upload_pending'

  def unique_application_per_combination
    existing = AdmissionApplication.where(
      admission_id: admission_id,
      college_id: college_id,
      department_id: department_id,
      course_id: course_id,
      email: email
    )
    existing = existing.where.not(id: id) if persisted?
    errors.add(:base, 'You have already applied to this college/department/course') if existing.exists?
  end

  def self.find_by_token(token)
    active.find_by(temporary_token: token)
  end

  def generate_application_number
    self.application_number ||= "ADM-#{SecureRandom.alphanumeric(6).upcase}"
  end

  def generate_temporary_token
    self.temporary_token ||= SecureRandom.alphanumeric(6)
  end

  def set_expiry
    self.expires_at ||= 24.hours.from_now
  end

  def update_documents_verified!
    update(documents_verified: admission_documents.all?(&:verified))
  end
end
