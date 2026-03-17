# frozen_string_literal: true

module Api
  module V1
    module SuperAdmins
      class BaseController < Api::V1::BaseController
        before_action :authorize_super_admin!
        
        private
        
        def authorize_super_admin!
          return if current_user.super_admin?
          
          json_response({ error: 'Unauthorized access' }, :forbidden)
        end
      end
    end
  end
end
