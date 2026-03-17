# frozen_string_literal: true

module Api
  module V1
    module Teachers
      class BaseController < Api::V1::BaseController
        before_action :authorize_teacher!
        
        private
        
        def authorize_teacher!
          return if current_user.teacher?
          
          json_response({ error: 'Unauthorized access' }, :forbidden)
        end
      end
    end
  end
end
