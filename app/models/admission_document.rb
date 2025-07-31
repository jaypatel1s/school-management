# frozen_string_literal: true

# :nodoc:
class AdmissionDocument < ApplicationRecord
  belongs_to :admission_application
  belongs_to :document_type

  has_one_attached :file

  validates :file, presence: true
  validates :document_type_id, uniqueness: {
    scope: :admission_application_id,
    message: 'already uploaded for this application'
  }

  validate :validate_file_type

  def validate_file_type
    return unless file.attached?

    acceptable_types = ['application/pdf', 'image/jpeg', 'image/png']
    unless acceptable_types.include?(file.content_type)
      errors.add(:file, 'must be a PDF or image file')
    end
  end
end
