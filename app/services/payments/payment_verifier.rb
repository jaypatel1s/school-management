# frozen_string_literal: true

module Payments
  # :nodoc:
  class PaymentVerifier
    attr_reader :college, :params, :gateway, :gateway_config, :payment

    def initialize(college, params)
      @college = college
      @params = params
      @gateway_config = college.college_payment_gateways.find_by(active: true)
      @gateway = initialize_gateway_process(@gateway_config&.name)
    end

    def call
      return { success: false, error: 'No active gateway' } unless @gateway
      return { success: false, error: 'Unsupported gateway' } unless success_status.key?(gateway_config.name.to_sym)

      verify_payment
    rescue StandardError => e
      { success: false, error: e.message }
    end

    private

    def initialize_gateway_process(name)
      case name
      when 'razorpay' then RazorpayProcessor.new(gateway_config)
      when 'stripe'   then StripeProcessor.new(gateway_config)
      when 'payu'     then PayUProcessor.new(gateway_config)
      when 'paytm'    then PaytmProcessor.new(gateway_config)
      end
    end

    def verify_payment
      payment_id_key = payment_param[gateway_config.name.to_sym]
      payment_id = params[payment_id_key]

      # Razorpay needs signature verification
      if gateway_config.name == 'razorpay'
        # Wrap as a single hash to avoid wrong number of arguments
        @gateway.verify_signature(
          {
            razorpay_order_id: params[:razorpay_order_id],
            razorpay_payment_id: payment_id,
            razorpay_signature: params[:razorpay_signature]
          }
        )
      end

      # Fetch the payment
      @payment = @gateway.fetch_payment(payment_id)

      # Compare status
      expected_status = success_status[gateway_config.name.to_sym]
      if @payment.status.to_s.downcase != expected_status.downcase
        return { success: false, error: "Payment status is #{@payment.status}, expected #{expected_status}" }
      end

      { success: true, payment: @payment }
    end

    # Dynamic mapping of gateways to success status

    def success_status
      {
        razorpay: 'captured',
        stripe: 'succeeded',
        payu: 'success',
        paytm: 'TXN_SUCCESS'
      }
    end

    def payment_param
      {
        razorpay: :razorpay_payment_id,
        stripe: :stripe_payment_id,
        payu: :payu_payment_id,
        paytm: :paytm_payment_id
      }
    end
  end
end
