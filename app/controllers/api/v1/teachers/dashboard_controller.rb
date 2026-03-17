# frozen_string_literal: true

module Api
  module V1
    module Teachers
      class DashboardController < BaseController
        def index
          json_response({
            stats: {
              my_courses: CountSerializer.new(current_user.teacher.courses),
              my_assignments: CountSerializer.new(current_user.teacher.assignments),
              my_students: CountSerializer.new(Student.joins(:courses).where(courses: { id: current_user.teacher.course_ids })),
              pending_submissions: CountSerializer.where_count(current_user.teacher.assignments.joins(:submissions).where(submissions: { submitted: false })),
              today_classes: CountSerializer.where_count(current_college.sessions.where(teacher_id: current_user.teacher.id, start_time: Date.current.all_day))
            },
            recent_activities: recent_activities_for_teacher
          })
        end
        
        private
        
        def recent_activities_for_teacher
          [
            "New assignment submitted by student",
            "Class schedule updated",
            "Student attendance marked"
          ]
        end
      end
    end
  end
end
