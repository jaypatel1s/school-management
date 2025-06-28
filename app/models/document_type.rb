# frozen_string_literal: true

# :nodoc:
class DocumentType < ApplicationRecord
  belongs_to :college

  validates :name, presence: true, uniqueness: { scope: :college_id }
end
