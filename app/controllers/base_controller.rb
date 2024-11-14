class BaseController < ApplicationController
  layout 'admin'
  before_action :authenticate_user!

  def modify_params(params)
    additional_params = { college_id: current_user.college_id, user_id: current_user.id }
    params.merge!(additional_params)
  end
end
