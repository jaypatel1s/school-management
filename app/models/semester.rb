# frozen_string_literal: true

# :nodoc:
class Semester < ApplicationRecord
  include Sluggable

  belongs_to :college
  has_many :courses, dependent: :destroy
  has_many :fee_components, dependent: :destroy
  has_many :admission_payments, dependent: :destroy
  has_many :student_fees, dependent: :destroy
  has_many :exams, dependent: :nullify
end
