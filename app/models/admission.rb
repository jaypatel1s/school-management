# frozen_string_literal: true

# app/models/admission.rb
class Admission < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :department
  belongs_to :course
  belongs_to :user, optional: true
  belongs_to :processed_by, class_name: 'User', optional: true
  has_many :admission_documents, dependent: :destroy

  before_validation :generate_application_number, on: :create
  before_validation :generate_temporary_token, on: :create
  before_validation :set_expiry, on: :create

  enum :status, {
    draft: 'draft',
    pending: 'pending',
    under_review: 'under_review',
    accepted: 'accepted',
    rejected: 'rejected',
    waitlisted: 'waitlisted'
  }, default: 'draft'

  validates :application_number, :temporary_token, presence: true, uniqueness: true

  validate :expiry_date_validity, if: -> { user.nil? }

  scope :active, -> { where('expires_at > ? OR user_id IS NOT NULL', Time.current) }
  scope :expired, -> { where('expires_at <= ? AND user_id IS NULL', Time.current) }

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
    self.expires_at ||= 1.day.from_now if user.nil?
  end

  def expiry_date_validity
    return unless expires_at.present? && expires_at <= Time.current

    errors.add(:expires_at, 'must be in the future for guest applications')
  end
end
