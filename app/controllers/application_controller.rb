class ApplicationController < ActionController::Base
  include ApplicationConcern
  helper_method :current_college

  def authenticate_admin!
    return if current_user.present? && current_user.principal?

    unauthenticate_response
  end

  def set_current_college
    @current_college =  current_user.college
  end

  def current_college
    @current_college
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
