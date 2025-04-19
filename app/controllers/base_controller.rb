# frozen_string_literal: true

# :nodoc:
class BaseController < ApplicationController
  layout 'admin'
  before_action :authenticate_user!
  before_action :authorize_action!
  before_action :set_current_college
  before_action :ensure_profile_setup

  def authorize_action!
    user_role = current_user.role.to_sym
    resource = controller_name.to_sym
    action = action_name.to_sym

    return if ROLE_PERMISSIONS.dig(user_role, resource)&.include?(action)

    redirect_to root_path, alert: 'You do not have permission to perform this action.'
  end


end
