# frozen_string_literal: true

# :nodoc:
class FeeComponent < ApplicationRecord
  belongs_to :college
  belongs_to :fee_structure

  validates :name, :amount, presence: true
  validates :amount, numericality: { greater_than_or_equal_to: 0 }
end
