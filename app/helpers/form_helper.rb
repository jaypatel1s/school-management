# frozen_string_literal: true

# :nodoc:
module FormHelper
  def select_gateway_options
    [%w[Razorpay razorpay], %w[Stripe stripe], %w[PayU payu], %w[Paytm paytm]]
  end
end
