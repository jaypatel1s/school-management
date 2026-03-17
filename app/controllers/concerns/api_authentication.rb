# frozen_string_literal: true

module ApiAuthentication
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request!
  end

  private

  def authenticate_request!
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      decoded = JwtService.decode(header)
      @current_user = User.find(decoded[:user_id])
    rescue JWT::DecodeError, NoMethodError
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end

  def authenticate_user!
    render json: { error: 'Not Authorized' }, status: :unauthorized unless current_user
  end
end
