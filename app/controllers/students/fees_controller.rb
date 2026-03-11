# frozen_string_literal: true

module Students
  # :nodoc:
  class FeesController < BaseController
    before_action :set_student_fee, only: %i[show]

    def index
      @student_fees = @profile.student_fees.includes(:fee_structure, :semester, :fee_payments)
                                      .order(due_date: :asc)
    end

    def show
      @fee_payments = @student_fee.fee_payments.order(payment_date: :desc)
      @admission_receipts = @student_fee.admission_receipts.includes(:admission_payment)
    end

    private

    def set_student_fee
      @student_fee = @profile.student_fees.find_by(slug: params[:slug])
      return if @student_fee.present?

      flash[:notice] = 'Fee Not Found'
      redirect_to college_students_fees_path(current_college.slug)
    end
  end
end
