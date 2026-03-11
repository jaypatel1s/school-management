# frozen_string_literal: true

module Students
  # :nodoc:
  class SessionsController < BaseController
    def index
      @sessions = Session.joins(:course)
                        .where(courses: { id: @profile.course_ids })
                        .includes(:course, :attendances)
                        .order(date: :desc)
    end

    def show
      @session = Session.joins(:course)
                        .where(courses: { id: @profile.course_ids })
                        .includes(:course, :attendances)
                        .find_by(slug: params[:slug])
      return if @session.present?

      flash[:notice] = 'Session Not Found'
      redirect_to college_students_sessions_path(current_college.slug)
    end
  end
end
