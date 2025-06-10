# frozen_string_literal: true

# :nodoc:
class FeeStructure < ApplicationRecord
  belongs_to :college
  belongs_to :academic_year
  belongs_to :department
  belongs_to :created_by, class_name: 'User'
  has_many :fee_components, dependent: :destroy
  has_many :student_fees, dependent: :destroy

  accepts_nested_attributes_for :fee_components, allow_destroy: true, reject_if: :all_blank

  validates :name, :total_amount, presence: true
  validates :total_amount, numericality: { greater_than: 0 }
end
