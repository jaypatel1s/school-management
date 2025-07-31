# frozen_string_literal: true

# :nodoc:
class AdmissionApplication < ApplicationRecord
  belongs_to :admission
  belongs_to :college
  belongs_to :department
  belongs_to :course

  has_many :admission_documents, dependent: :destroy
  has_many :admission_payments, dependent: :destroy
  has_many :admission_receipts, through: :admission_payments

  enum :status, {
    document_upload_pending: 'document_upload_pending',
    under_review: 'under_review',
    documents_accepted: 'documents_accepted',
    payment_pending: 'payment_pending',
    admitted: 'admitted',
    rejected: 'rejected'
  }, default: 'document_upload_pending'

  validate :unique_application_per_combination

  def unique_application_per_combination
    existing = AdmissionApplication.where(
      admission_id: admission_id,
      college_id: college_id,
      department_id: department_id,
      course_id: course_id
    )
    existing = existing.where.not(id: id) if persisted?
    errors.add(:base, 'You have already applied to this college/department/course') if existing.exists?
  end
end
