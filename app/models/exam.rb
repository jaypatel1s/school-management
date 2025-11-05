# frozen_string_literal: true

class Exam < ApplicationRecord
  include Sluggable
  # --- Associations ---
  belongs_to :college
  belongs_to :academic_year
  belongs_to :semester
  belongs_to :course

  # An exam can have many results (submissions/scores)
  has_many :exam_results, dependent: :destroy

  # --- Validations ---
  validates :name, presence: true
  validates :scheduled_at, presence: true
  validates :max_marks, presence: true, numericality: { greater_than: 0 }

  # --- Enums (to define the type of exam) ---
  enum :exam_type, { midterm: 0, final: 1, quiz: 2, assignment_test: 3 }

  # --- Callbacks/Logic ---
  # Example: Ensure slug is generated before validation/save
  # include Sluggable # Assuming you have a sluggable concern or gem
  # before_validation :generate_slug, on: :create

  # A scope to easily find upcoming exams
  scope :upcoming, -> { where('scheduled_at > ?', Time.current).order(scheduled_at: :asc) }
end
