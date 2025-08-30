# frozen_string_literal: true

module Payments
  # :nodoc:
  class RazorpayProcessor
    def initialize(config)
      @config = config
      Razorpay.setup(@config['api_key'], @config['api_secret'])
    end

    def verify_signature(payload)
      Razorpay::Utility.verify_payment_signature(payload)
    end

    def fetch_payment(payment_id)
      Razorpay::Payment.fetch(payment_id)
    end
  end
end
