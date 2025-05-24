class CsvFile < ApplicationRecord
  belongs_to :college

  validates :name, :email, :role, presence: true
  validates :email, uniqueness: { case_sensitive: false }
end
