# frozen_string_literal: true

module Admissions
  # :nodoc:
  class PaymentProcessor
    attr_accessor :admission_application, :payment, :semester

    def initialize(admission_application, payment)
      @admission_application = admission_application
      @payment = payment
      @semester = admission_application.college.semesters.find_by(name: 'SEM1')
    end

    def call
      ActiveRecord::Base.transaction do
        create_user_and_student
        generate_student_fee
        record_fee_payment
        generate_receipt
      end
      { success: true, errors: nil }
    rescue StandardError => e
      Rails.logger.error "[PaymentProcessor] #{e.class} - #{e.message}"
      { success: false, errors: [e.message] }
    end

    private

    def create_user_and_student
      user = User.find_or_initialize_by(email: admission_application.email)
      user.update(password: SecureRandom.hex(8), name: admission_application.name, role: :student,
                  college_id: admission_application.college_id)
      student = Student.find_or_initialize_by(admission_application_id: admission_application.id)
      student.update(user_id: user.id, status: :active, college_id: admission_application.college_id,
                     roll_number: "#{admission_application.application_number}-#{user.id}",
                     mobile_no: admission_application.phone)

      @student = student
    end

    def generate_student_fee
      fee_structure = FeeStructure.find_by(id: admission_application.fee_structure_id)
      @student_fee = StudentFee.find_or_initialize_by(
        student: @student,
        fee_structure: fee_structure,
        college: admission_application.college,
        admission_application: admission_application, semester_id: semester&.id
      )
      semester_amount = admission_application.fee_structure.fee_components
                                             .where(semester_id: semester&.id)
                                             .sum(:amount)
      amount_in_rupees = payment.amount / 100.0
      amount_paid = @student_fee.amount_paid.to_f + amount_in_rupees
      @student_fee.update(amount_paid:, status: :paid, due_date: Time.zone.today + 30.days,
                          total_amount: semester_amount)
    end

    def record_fee_payment
      amount_in_rupees = payment.amount / 100.0
      @fee_payment =
        FeePayment.find_or_initialize_by(student_fee: @student_fee, college_id: admission_application.college_id,
                                         transaction_reference: payment.acquirer_data['upi_transaction_id'])
      @fee_payment.update(payment_date: Time.current, payment_method: payment.method, amount: amount_in_rupees,
                          notes: "Installment ##{@student_fee.fee_payments.count + 1}")
    end

    def generate_receipt
      admission_payment = AdmissionPayment.find_by(transaction_id: payment.order_id)
      admission_receipt = AdmissionReceipt.find_or_initialize_by(student_fee_id: @student_fee.id)
      admission_receipt.update(admission_payment: admission_payment, receipt_number: SecureRandom.hex(6), pdf_url: nil)
    end
  end
end
