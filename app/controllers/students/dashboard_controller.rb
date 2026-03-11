# frozen_string_literal: true

module Students
  # :nodoc:
  class DashboardController < BaseController
    def index
      @student = @profile
      @recent_attendances = @student.attendances.includes(:session).order(created_at: :desc).limit(5)
      @recent_assignments = Assignment.joins(:course)
                                     .where(courses: { id: @student.course_ids })
                                     .order(created_at: :desc).limit(5)
      @upcoming_exams = Exam.joins(:course)
                           .where(courses: { id: @student.course_ids })
                           .where('scheduled_at > ?', Time.current)
                           .order(scheduled_at: :asc).limit(5)
    end
  end
end
