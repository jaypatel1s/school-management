# frozen_string_literal: true

# :nodoc:
class FeeStructure < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :classroom
  before_save :set_total_fees

  validates :tuition_fee, presence: true, numericality: { only_integer: true }
  validates :other_expense, presence: true, numericality: { only_integer: true }
  validates :name, presence: true, numericality: { only_integer: true }

  def set_total_fees
    self.total_fee = (tuition_fee || 0) + (other_expense || 0)
  end
end
