# frozen_string_literal: true

module Payments
  # :nodoc:
  class CreateGatewayOrder
    attr_reader :admission_application, :gateway_name, :gateway_config, :order, :semester, :semester_amount

    def initialize(admission_application, gateway_name)
      @admission_application = admission_application
      @gateway_name = gateway_name
      @gateway_config = admission_application.college.college_payment_gateways.find_by(name: gateway_name,
                                                                                       active: true)
      @semester = admission_application.college.semesters.find_by(name: 'SEM1')
      @semester_amount =
        @admission_application.fee_structure.fee_components.where(semester_id: semester&.id).sum(:amount)

      raise 'No active payment gateway found for this college' unless @gateway_config
    end

    def call
      case gateway_name
      when 'razorpay' then create_razorpay_order
      when 'stripe'   then create_stripe_order
      when 'payu'     then create_payu_order
      when 'paytm'    then create_paytm_order
      else
        raise "Unsupported gateway #{gateway_name}"
      end

      order
    end

    private

    def create_razorpay_order
      Razorpay.setup(gateway_config.api_key, gateway_config.api_secret)
      @order = Razorpay::Order.create(
        amount: (semester_amount * 100).to_i,
        currency: 'INR',
        receipt: "APP-#{admission_application.id}-#{SecureRandom.hex(4)}"
      )
      save_pending_payment(order.id)
    end

    def create_stripe_order
      Stripe.api_key = gateway_config.api_secret
      @order = Stripe::PaymentIntent.create(
        amount: (semester_amount * 100).to_i,
        currency: 'inr',
        description: "Admission Payment for #{@admission_application.application_number}"
      )
      save_pending_payment(order.id)
    end

    def create_payu_order
      # Placeholder: integrate PayU SDK / API call here
      #
      @order = {
        id: SecureRandom.hex(6),
        amount: admission_application.fee_structure.total_amount * 100
      }

      save_pending_payment(order.id)
    end

    def create_paytm_order
      @order = {
        id: SecureRandom.hex(6),
        amount: admission_application.fee_structure.total_amount * 100
      }

      # Placeholder: integrate PayTM SDK / API call here
      save_pending_payment(order.id)
    end

    def save_pending_payment(transaction_id)
      admission_application.admission_payments.create!(
        amount: semester_amount,
        payment_mode: :online,
        payment_status: :pending,
        transaction_id: transaction_id,
        semester_id: semester.id
      )
    end
  end
end
