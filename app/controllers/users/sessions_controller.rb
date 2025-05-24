# frozen_string_literal: true

module Users
  # :nodoc:
  class SessionsController < Devise::SessionsController
    layout 'authentication'
    before_action :destroy_site_session, only: :destroy

    def create
      resource = User.find_for_database_authentication(
        email: user_params[:email]
      )
      if resource&.valid_password?(user_params[:password])
        sign_in :user, resource
        flash[:success] = 'Login successfully.'
        redirect_to specific_dashboard_path(resource)
      else
        flash[:alert] = 'Invalid Credentials.'
        redirect_to new_user_session_path
      end
    end

    def destroy_site_session
      session[:site_slug] = nil
    end

    def after_sign_out_path_for(resource_or_scope)
      root_url(subdomain: false)
    end

    def specific_dashboard_path(resource)
      if resource.principal?
        authenticated_user_path
      else
        college_setup_path(resource.college.slug)
      end
    end

    def webauthn_login
      options = WebAuthn::Credential.options_for_get
      render json: options
    end

    def verify_webauthn_login
      credential = WebAuthn::Credential.from_get(params.require(:webauthn_credential))
      user_handle = credential.response.user_handle
      user = User.find_by!(id: user_handle)
      webauthn_credential = user.webauthn_credentials.find_by!(external_id: credential.id)

      begin
        credential.verify(
          params[:challenge],
          public_key: webauthn_credential.public_key,
          sign_count: webauthn_credential.sign_count
        )

        webauthn_credential.update!(sign_count: credential.sign_count)
        sign_in(user)
        render json: { success: true }
      rescue StandardError => e
        render json: { success: false, error: e.message }
      end
    end

    protected

    def user_params
      params.require(:user).permit(:email, :password)
    end

    private

    def respond_to_on_destroy
      respond_to do |format|
        format.all { head :no_content }
        format.any(*navigational_formats) { redirect_to after_sign_out_path_for(resource_name), status: Devise.responder.redirect_status, allow_other_host: true}
      end
    end

    def require_no_authentication
      assert_is_devise_resource!
      return unless is_navigational_format?
      no_input = devise_mapping.no_input_strategies

      authenticated = if no_input.present?
        args = no_input.dup.push scope: resource_name
        warden.authenticate?(*args)
      else
        warden.authenticated?(resource_name)
      end

      if authenticated && resource = warden.user(resource_name)
        set_flash_message(:alert, 'already_authenticated', scope: 'devise.failure')
        redirect_to authenticated_user_path(resource)
      end
    end
  end
end
