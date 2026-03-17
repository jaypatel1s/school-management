# frozen_string_literal: true

module Api
  module V1
    module Students
      class DashboardController < BaseController
        def index
          json_response({
            stats: {
              my_courses: CountSerializer.new(current_user.student&.courses || []),
              my_attendance: CountSerializer.new(current_user.student&.attendances || []),
              my_books: CountSerializer.where_count(current_college.book_issues, student_id: current_user.student.id, return_date: nil),
              pending_fees: CountSerializer.where_count(current_user.student&.student_fees || [], status: 'pending')
            },
            recent_activities: recent_activities_for_student
          })
        end

        private

        def recent_activities_for_student
          [
            "New book available in library",
            "Exam schedule updated",
            "Fee payment reminder"
          ]
        end
      end
    end
  end
end
