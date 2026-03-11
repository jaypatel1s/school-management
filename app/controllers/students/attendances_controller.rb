# frozen_string_literal: true

module Students
  # :nodoc:
  class AttendancesController < BaseController
    before_action :set_session
    before_action :set_attendance, only: %i[show]

    def index
      @attendances = @session.attendances.where(student: @profile).includes(:session, :course).order(created_at: :desc)
    end

    def show
      return if @attendance.present?

      flash[:notice] = 'Attendance Not Found'
      redirect_to college_students_session_attendances_path(current_college.slug, @session.slug)
    end

    def report
      @attendances = @profile.attendances.includes(:session, :course)
                                      .order(created_at: :desc)
      @attendance_stats = {
        total: @attendances.count,
        present: @attendances.where(status: 'present').count,
        absent: @attendances.where(status: 'absent').count,
        late: @attendances.where(status: 'late').count
      }
    end

    private

    def set_session
      @session = Session.joins(:course)
                       .where(courses: { id: @profile.course_ids })
                       .find_by(slug: params[:session_slug])
      return if @session.present?

      flash[:notice] = 'Session Not Found'
      redirect_to college_students_sessions_path(current_college.slug)
    end

    def set_attendance
      @attendance = @session.attendances.find_by(slug: params[:id])
    end
  end
end
