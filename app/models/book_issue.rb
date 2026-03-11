class BookIssue < ApplicationRecord
  belongs_to :college
  belongs_to :student
  belongs_to :book
  has_one :fine, dependent: :destroy

  validates :issue_date, :due_date, presence: true

  after_update :check_for_fine, if: -> { saved_change_to_return_date? && return_date.present? }

  def returned?
    return_date.present?
  end

  def overdue_days
    return 0 unless return_date && due_date
    [(return_date - due_date).to_i, 0].max
  end

  def renew(extra_days = 7)
    update!(due_date: due_date + extra_days)
  end

  def check_for_fine
    days_overdue = overdue_days
    return if days_overdue.zero?

    Fine.create!(
      book_issue: self,
      student: student,
      college: college,
      amount: days_overdue * 10, # ₹10/day fine
      reason: "Overdue by #{days_overdue} days"
    )
  end
end
