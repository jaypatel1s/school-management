# frozen_string_literal: true

# :nodoc:
class BaseController < ApplicationController
  layout 'admin'
  before_action :authenticate_user!
  before_action :authorize_action!
  before_action :set_current_college

  def authorize_action!
    user_role = current_user.role.to_sym
    resource = controller_name.to_sym
    action = action_name.to_sym

    return if ROLE_PERMISSIONS.dig(user_role, resource)&.include?(action)

    redirect_to root_path, alert: 'You do not have permission to perform this action.'
  end

  def modify_params(params, user)
    additional_params = { college_id: current_user.college_id, user_id: user.id }
    params.merge!(additional_params)
  end
end
