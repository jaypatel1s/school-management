# frozen_string_literal: true

module Api
  module V1
    module SuperAdmins
      class DashboardController < BaseController
        def index
          json_response({
            stats: {
              total_colleges: CountSerializer.new(College),
              total_users: CountSerializer.new(User),
              total_students: CountSerializer.new(Student),
              total_teachers: CountSerializer.new(Teacher),
              total_books: CountSerializer.new(Book),
              active_sessions: CountSerializer.where_count(Doorkeeper::AccessToken.where(revoked_at: nil))
            },
            recent_activities: recent_activities_for_super_admin
          })
        end
        
        private
        
        def recent_activities_for_super_admin
          [
            "New college registered",
            "System backup completed",
            "User account created"
          ]
        end
      end
    end
  end
end
