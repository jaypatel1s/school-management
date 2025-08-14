# frozen_string_literal: true

# :nodoc:
class Admission < ApplicationRecord
  include Sluggable

  has_many :admission_applications, dependent: :destroy
  has_many :admission_college_actives, dependent: :destroy
  has_many :colleges, through: :admission_college_actives

  accepts_nested_attributes_for :admission_applications, allow_destroy: true

  # before_validation :generate_application_number, on: :create
  # before_validation :generate_temporary_token, on: :create
  before_validation :set_expiry, on: :create

  enum :status, {
    pending: 'pending',
    active: 'active',
    closed: 'closed'
  }, default: 'pending'

  # validates :email, :application_number, :temporary_token, presence: true
  # validates :application_number, :temporary_token, uniqueness: true
  # validate :expiry_date_validity, if: -> { user.nil? }

  scope :active, -> { where('expires_at > ? OR user_id IS NOT NULL', Time.current) }
  scope :expired, -> { where('expires_at <= ? AND user_id IS NULL', Time.current) }

  # def self.find_by_token(token)
  #   active.find_by(temporary_token: token)
  # end

  # def generate_application_number
  #   self.application_number ||= "ADM-#{SecureRandom.alphanumeric(6).upcase}"
  # end

  # def generate_temporary_token
  #   self.temporary_token ||= SecureRandom.alphanumeric(6)
  # end

  def set_expiry
    self.expires_at ||= 24.hours.from_now
  end

  # def expiry_date_validity
  #   return unless expires_at.present? && expires_at <= Time.current
  #   errors.add(:expires_at, 'must be in the future for guest applications')
  # end
end
