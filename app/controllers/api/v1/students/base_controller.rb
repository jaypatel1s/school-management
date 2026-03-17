# frozen_string_literal: true

module Api
  module V1
    module Students
      class BaseController < Api::V1::BaseController
        before_action :authorize_student!
        
        private
        
        def authorize_student!
          return if current_user.student?
          
          json_response({ error: 'Unauthorized access' }, :forbidden)
        end
      end
    end
  end
end
