class Book < ApplicationRecord
  belongs_to :college
  has_many :book_issues, dependent: :destroy
  has_many :students, through: :book_issues

  validates :title, :author, presence: true
  validates :total_copies, numericality: { greater_than_or_equal_to: 0 }

  before_create :set_available_copies

  def available?
    available_copies > 0
  end

  def issue_to(student)
    raise "No copies available" unless available?

    transaction do
      book_issue = book_issues.create!(
        student: student,
        college: college,
        issue_date: Date.yesterday,
        due_date: Date.yesterday
      )
      decrement!(:available_copies)
      book_issue
    end
  end

  private

  def set_available_copies
    self.available_copies ||= total_copies
  end
end
