# frozen_string_literal: true

# :nodoc:
class Note < ApplicationRecord
  belongs_to :notable, polymorphic: true
  belongs_to :user
end
