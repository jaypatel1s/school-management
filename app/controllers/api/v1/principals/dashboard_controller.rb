# frozen_string_literal: true

module Api
  module V1
    module Principals
      class DashboardController < BaseController
        def index
          json_response({
            stats: {
              total_students: CountSerializer.new(current_college.students),
              total_teachers: CountSerializer.new(current_college.teachers),
              total_courses: CountSerializer.new(current_college.courses),
              total_books: CountSerializer.new(current_college.books),
              books_issued: CountSerializer.where_count(current_college.book_issues, return_date: nil)
            },
            recent_activities: recent_activities_for_principal
          })
        end

        private

        def recent_activities_for_principal
          [
            "New admission application received",
            "Library book issued to student",
            "Teacher assignment updated"
          ]
        end
      end
    end
  end
end
