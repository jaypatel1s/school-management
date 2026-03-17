# frozen_string_literal: true

module Api
  module V1
    class SessionsController < BaseController
      skip_before_action :doorkeeper_authorize!, only: [:create]

      def create
        user = User.find_by(email: params[:email].downcase)

        if user&.valid_password?(params[:password])
          # Use Doorkeeper OAuth2 password grant flow
          client = Doorkeeper::Application.find_by(uid: params[:client_id])

          unless client
            return json_response({ error: 'Invalid client credentials' }, :unauthorized)
          end

          # Create access token using Doorkeeper
          access_token = Doorkeeper::AccessToken.create!(
            resource_owner_id: user.id,
            application_id: client.id,
            scopes: 'read write',
            expires_in: 2.hours
          )

          json_response({
            message: 'Login successful',
            access_token: access_token.token,
            token_type: 'Bearer',
            expires_in: access_token.expires_in,
            refresh_token: access_token.refresh_token,
            user: UserSerializer.new(user, params: { jwt: access_token.token }).serializable_hash[:data][:attributes]
          })
        else
          json_response({ error: 'Invalid email or password' }, :unauthorized)
        end
      end

      def destroy
        # Revoke the current access token
        if doorkeeper_token
          doorkeeper_token.revoke
          json_response({ message: 'Logout successful' })
        else
          json_response({ message: 'No active session' }, :unprocessable_entity)
        end
      end

      def me
        json_response({
          user: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
        })
      end
    end
  end
end
