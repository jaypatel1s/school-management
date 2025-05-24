# frozen_string_literal: true

# :nodoc:
class Fee < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :department
  belongs_to :course
  belongs_to :fee_type
end
