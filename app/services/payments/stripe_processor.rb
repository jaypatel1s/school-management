# frozen_string_literal: true

module Payments
  # :nodoc:
  class StripeProcessor
    def initialize(config)
      @config = config
      Stripe.api_key = @config.config['secret_key']
    end

    def fetch_payment(payment_id)
      Stripe::PaymentIntent.retrieve(payment_id)
    end
  end
end
