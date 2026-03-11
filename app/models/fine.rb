class Fine < ApplicationRecord
  belongs_to :college
  belongs_to :student
  belongs_to :book_issue

  validates :amount, numericality: { greater_than: 0 }

  scope :unpaid, -> { where(paid: false) }

  def mark_paid!
    update!(paid: true)
  end
end
