# frozen_string_literal: true

# :nodoc:
class AcademicYear < ApplicationRecord
  include Sluggable

  belongs_to :college
  has_many :fee_structures, dependent: :nullify
  validates :name, :start_date, :end_date, presence: true
  validates :name, uniqueness: {scope: :college_id}
  validate :end_date_after_start_date

  def end_date_after_start_date
    return if end_date.blank? || start_date.blank?

    errors.add(:end_date, 'must be after start date') if end_date <= start_date
  end
end
