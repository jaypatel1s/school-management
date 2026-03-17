# frozen_string_literal: true

class JwtService
  SECRET_KEY = Rails.application.credentials.secret_key_base || 'fallback_secret_key'
  ALGORITHM = 'HS256'

  class << self
    def encode(payload, exp = 24.hours.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, SECRET_KEY, ALGORITHM)
    end

    def decode(token)
      decoded = JWT.decode(token, SECRET_KEY, true, algorithm: ALGORITHM)
      decoded[0]
    rescue JWT::ExpiredSignature, JWT::DecodeError => e
      raise JWT::DecodeError, e.message
    end

    def valid_token?(token)
      !decode(token).nil?
    rescue JWT::DecodeError
      false
    end
  end
end
