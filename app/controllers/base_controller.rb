class BaseController < ApplicationController
  layout 'admin'
  before_action :authenticate_user!
  before_action :authorize_action!

  def authorize_action!
    user_role = current_user.role.to_sym
    resource = controller_name.to_sym
    action = action_name.to_sym

    unless ROLE_PERMISSIONS.dig(user_role, resource)&.include?(action)
      redirect_to root_path, alert: "You do not have permission to perform this action."
    end
  end

  def modify_params(params)
    additional_params = { college_id: current_user.college_id, user_id: current_user.id }
    params.merge!(additional_params)
  end
end
