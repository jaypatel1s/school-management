# frozen_string_literal: true

# :nodoc:
class FeePayment < ApplicationRecord
  belongs_to :college
  belongs_to :student_fee
end
