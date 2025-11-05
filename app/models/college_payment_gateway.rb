# frozen_string_literal: true

# :nodoc:
class CollegePaymentGateway < ApplicationRecord
  include Sluggable
  belongs_to :college

  validates :name, presence: true
  validates :college_id, uniqueness: { scope: :name }

  def active?
    active
  end
end
