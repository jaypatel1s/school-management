# frozen_string_literal: true

module Api
  module V1
    module Principals
      class BaseController < Api::V1::BaseController
        before_action :authorize_principal!
        
        private
        
        def authorize_principal!
          return if current_user.principal?
          
          json_response({ error: 'Unauthorized access' }, :forbidden)
        end
      end
    end
  end
end
