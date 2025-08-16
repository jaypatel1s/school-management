class AdmissionPayment < ApplicationRecord
  belongs_to :admission_application
  has_one :admission_receipt, dependent: :destroy
end
