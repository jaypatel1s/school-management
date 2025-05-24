# frozen_string_literal: true

# :nodoc:
class WebAuthnCredential < ApplicationRecord
  belongs_to :user
end
