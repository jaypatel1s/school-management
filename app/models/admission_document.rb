# frozen_string_literal: true

# :nodoc:
class AdmissionDocument < ApplicationRecord
  belongs_to :admission
  belongs_to :document_type

  has_one_attached :file

  validates :file, presence: true
  validates :document_type_id,
            uniqueness: { scope: :admission_id, message: 'has already been uploaded for this admission' }
end
