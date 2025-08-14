# app/models/admission_college_active.rb
class AdmissionCollegeActive < ApplicationRecord
  belongs_to :admission
  belongs_to :college

  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: [false, nil]) }

  def activate
    update(active: true, activation_date: Time.current)
  end

  def deactivate
    update(active: false)
  end
end
