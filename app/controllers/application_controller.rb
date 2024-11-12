class ApplicationController < ActionController::Base
  include ApplicationConcern

  def authenticate_admin!
    return if current_user.present? && current_user.admin?

    unauthenticate_response
  end

  def authenticate_user!
    return if current_user.present?

    unauthenticate_response
  end

  def unauthenticate_response
    if request.format == 'text/html'
      redirect_to(authenticated_user_path, alert: 'You are not authorized to access this page.')
    else
      flash[:alert] = 'You are not authorized to access this page.'
      render js: "window.location = '/'"
    end
  end
end
