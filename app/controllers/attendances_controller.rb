# frozen_string_literal: true

# :nodoc:
class AttendancesController < BaseController
  before_action :set_session_from_qr, only: %i[new create]

  def new
    if @session.attendance_window_expired?
      redirect_to root_path, alert: 'Attendance window has closed'
      return
    end
    @attendance = current_user.attendances.new
  end

  def create
    if @session.attendance_window_expired?
      redirect_to root_path, alert: 'Attendance window has closed'
      return
    end

    if @session.present?
      @attendance = current_college.attendances.new(session_id: @session.id, student_id: current_user.id,
                                                    status: 'present')
      if @attendance.save
        redirect_to root_path, notice: 'Attendance marked successfully!'
      else
        render :new
      end
    else
      flash.now[:alert] = 'Invalid student ID or QR code'
      render :new
    end
  end

  def report
    @session = current_college.sessions.find_by(slug: params[:session_slug])
    send_file @session.generate_attendance_report,
              filename: "attendance_report_session_#{@session.id}.csv",
              type: 'text/csv'
  end

  private

  def set_session_from_qr
    @session = current_college.sessions.find_by(slug: params[:session_slug], qr_token: params[:qr_token])
    return if @session.present?

    redirect_to root_path, alert: 'Invalid QR code'
  end
end
