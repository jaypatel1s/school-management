# frozen_string_literal: true

# :nodoc:
class ApplicationController < ActionController::Base
  include ApplicationConcern

  helper_method :current_college

  def set_current_college
    if params[:college_slug] == current_user.college.slug
      @current_college = College.find_by(slug: params[:college_slug])
    elsif params[:session_slug] == current_user.college.slug
      @current_college = College.find_by(slug: params[:session_slug])
    else
      @current_college = College.first
    end
    return if @current_college.present?

    flash[:alert] = 'College not match with current user'
    redirect_to authenticated_user_path(current_user)
  end

  attr_reader :current_college

  def authenticate_user!
    return if current_user.present?

    unauthenticated_response
  end

  def authenticate_admin!
    return if current_user.present? && current_user.principal?

    unauthenticated_response
  end


  def unauthenticated_response
    if request.format == 'text/html'
      redirect_to(authenticated_user_path, alert: 'You are not authorized to access this page.')
    else
      flash[:alert] = 'You are not authorized to access this page.'
      render js: "window.location = '/'"
    end
  end

  def ensure_profile_setup
    if user_signed_in? && !current_user.profile_setup?
      redirect_to college_setup_path(current_college.slug)
    end
  end
end
