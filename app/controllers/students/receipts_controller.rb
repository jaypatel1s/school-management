# frozen_string_literal: true

module Students
  # :nodoc:
  class ReceiptsController < BaseController
    def index
      @admission_receipts = @profile.student_fees.joins(:admission_receipts)
                                          .includes(admission_receipts: :admission_payment)
                                          .where.not(admission_receipts: { id: nil })
                                          .order(created_at: :desc)
      
      @fee_receipts = @profile.student_fees.joins(:fee_payments)
                                      .includes(fee_payments: :student_fee)
                                      .where.not(fee_payments: { id: nil })
                                      .order(created_at: :desc)
    end

    def show
      @receipt = AdmissionReceipt.find_by(id: params[:id])
      
      unless @receipt&.student_fee&.student == @profile
        flash[:notice] = 'Receipt Not Found'
        redirect_to college_students_receipts_path(current_college.slug)
      end
    end

    def download
      @receipt = AdmissionReceipt.find_by(id: params[:id])
      
      unless @receipt&.student_fee&.student == @profile
        flash[:notice] = 'Receipt Not Found'
        redirect_to college_students_receipts_path(current_college.slug)
        return
      end

      # TODO: Generate PDF receipt
      send_data generate_receipt_pdf(@receipt), 
              filename: "receipt_#{@receipt.receipt_number}.pdf",
              type: 'application/pdf',
              disposition: 'inline'
    end

    private

    def generate_receipt_pdf(receipt)
      # TODO: Implement PDF generation using Prawn or similar
      "Receipt ##{receipt.receipt_number}\nAmount: #{receipt.student_fee.amount_paid}\nDate: #{receipt.created_at}"
    end
  end
end
