# frozen_string_literal: true

# :nodoc:
class AdmissionPaymentsController < ApplicationController
  before_action :set_admission
  before_action :set_admission_application
  before_action :check_documents_verified, only: %i[new create]

  def index
    @payments = @admission_application.admission_payments.order(created_at: :desc)
  end

  # app/controllers/admission_payments_controller.rb
  def new
    @payment = @admission_application.admission_payments.new
    @fee_structure = @admission_application.fee_structure
    @fee_components = @fee_structure.fee_components
    @gateway = @admission_application.college.college_payment_gateways.find_by(active: true)
    # Token validation flags
    @validate_attempt = params[:validate].present?
    @token_matched =
      params[:application_number].to_s == @admission_application.application_number &&
      params[:temporary_token].to_s == @admission_application.temporary_token
  end

  def create
    @gateway = @admission_application.college.college_payment_gateways.find_by(active: true)
    order = Payments::CreateGatewayOrder.new(@admission_application, params[:gateway_name]).call
    render json: {
      order_id: order.id,
      key: @gateway.api_key,
      amount: order.amount,
      name: 'Admission Payment',
      gateway_name: params[:gateway_name]
    }
  rescue StandardError => e
    render json: { success: false, error: e.message }, status: :unprocessable_entity
  end

  def verify
    verifier = Payments::PaymentVerifier.new(@admission_application.college, params)
    result = verifier.call

    if result[:success]
      Admissions::PaymentProcessor.new(@admission_application, result[:payment]).call
      @admission_application.update(status: :admitted) if @admission_application.payment_pending?

      render json: { success: true, redirect_url: new_user_session_path }
    else
      render json: { success: false, message: result[:error] },
             status: :unprocessable_entity
    end
  rescue StandardError => e
    Rails.logger.error "[PaymentVerify] #{e.class} - #{e.message}"
    render json: { success: false, message: 'Something went wrong' },
           status: :internal_server_error
  end

  private

  def set_admission
    @admission = Admission.find_by!(slug: params[:public_admission_slug])
  end

  def set_admission_application
    @admission_application = @admission.admission_applications.find_by!(slug: params[:admission_application_slug])
  end

  def check_documents_verified
    return if @admission_application.documents_verified

    flash[:alert] = 'All documents must be verified before payment'
    redirect_to public_admission_admission_applications_path(public_admission_slug: @admission.slug,
                                                             slug: @admission_application.slug)
  end

  def payment_params
    params.require(:admission_payment).permit(:amount, :payment_mode, :payment_status, :transaction_id, :paid_at)
  end
end
