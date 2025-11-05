# frozen_string_literal: true

# :nodoc:
class StudentFee < ApplicationRecord
  belongs_to :college
  belongs_to :student, optional: true
  belongs_to :fee_structure
  belongs_to :admission_application, optional: true
  belongs_to :semester
  has_many :fee_payments, dependent: :destroy
  has_many :admission_receipts, dependent: :destroy

  validates :due_date, presence: true

  enum :status, { unpaid: 'unpaid', partial: 'partial', paid: 'paid', overdue: 'overdue' }

  # after_save :create_student_if_fully_paid

  def create_student_if_fully_paid
    return unless paid? && student.nil? && admission_application.present?

    admission = admission_application.admission
    user = User.create!(
      email: admission.email,
      password: SecureRandom.hex(4)
    )

    new_student = Student.create!(
      user: user,
      college: admission_application.college,
      status: :active,
      admission_application: admission_application
    )

    new_student.courses << admission_application.course

    StudentMailer.with(student: new_student, password: user.password).welcome_email.deliver_later
  end
end
