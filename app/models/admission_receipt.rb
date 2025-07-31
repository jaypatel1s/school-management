class AdmissionReceipt < ApplicationRecord
  belongs_to :student_fee
  belongs_to :admission_payment
end
