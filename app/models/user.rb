# frozen_string_literal: true

class User < ApplicationRecord
  include Sluggable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable, :confirmable, :timeoutable, :trackable, :registerable
  belongs_to :college
  has_many :departments, foreign_key: :head_id, dependent: :destroy
  has_many :courses, foreign_key: :teacher_id, dependent: :destroy
  has_many :sessions, through: :courses

  # has_many :attendances, foreign_key: :student_id
  # has_many :attended_sessions, through: :attendances, source: :session
  # has_many :webauthn_credentials, class_name: 'WebAuthnCredential', dependent: :destroy

  enum :role, { principal: 0, teacher: 1, student: 2 }

  def webauthn_user
    WebAuthn::PublicKeyCredential::UserEntity.new(
      id: id.to_s,
      name: email,
      display_name: email
    )
  end

  def principal?
    %w[principal].include?(role)
  end

  def teacher?
    %w[teacher].include?(role)
  end

  def user?
    %w[student].include?(role)
  end
end
