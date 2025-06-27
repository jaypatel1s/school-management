# frozen_string_literal: true

# :nodoc:
class DocumentType < ApplicationRecord
  include Sluggable

  belongs_to :college

  validates :name, presence: true, uniqueness: { scope: :college_id }
end
