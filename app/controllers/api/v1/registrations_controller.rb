# frozen_string_literal: true

module Api
  module V1
    class RegistrationsController < BaseController
      skip_before_action :doorkeeper_authorize!, only: [:create]

      def create
        user = User.new(user_params)

        if user.save
          token = JwtService.encode({ user_id: user.id, role: user.role })

          json_response({
            message: 'Registration successful',
            token: token,
            user: UserSerializer.new(user, params: { jwt: token }).serializable_hash[:data][:attributes]
          }, :created)
        else
          json_response({ validation: format_validation_errors(user.errors) }, :unprocessable_entity)
        end
      end

      private

      def user_params
        params.require(:user).permit(
          :email, :password, :password_confirmation,
          :role, :college_id, :first_name, :last_name
        )
      end
    end
  end
end
