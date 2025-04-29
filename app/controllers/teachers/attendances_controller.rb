# frozen_string_literal: true

# :nodoc:
module Teachers
  class AttendancesController < BaseController
    before_action :set_attendance, only: %i[show edit update destroy]

    def index
      @attendances =
        Attendance.joins(:session).where(sessions: { teacher_id: @profile.id }).includes(:student, :session)
    end

    def show; end

    def new
      @attendance = current_college.attendances.new
      @student_courses = @profile.course.student_courses.includes(:student)
    end

    def edit; end

    def create
      @attendance = current_college.attendances.new(attendance_params)
      @attendance.department_id = @profile.department_id
      if @attendance.save!
        flash[:success] = 'Attendance Created Successfully'
        redirect_to college_teachers_attendances_path(current_college.slug)
      else
        flash[:alert] = @attendance.errors.full_messages
        render :new
      end
    end

    def update
      if @attendance.update(attendance_params)
        flash[:success] = 'Attendance Updated Successfully.'
        redirect_to college_teachers_attendances_path(current_college.slug)
      else
        flash[:alert] = @attendance.errors.full_messages
        render :edit
      end
    end

    def destroy
      @attendance.destroy
      flash[:success] = 'Attendance Deleted Successfully'
      redirect_to college_teachers_attendances_path(current_college.slug)
    end

    private

    def set_attendance
      @attendance = current_college.attendances.find_by(slug: params[:slug])
      return if @attendance.present?

      flash[:notice] = 'Attendance Not Found'
      redirect_to college_teachers_attendances_path(current_college.slug)
    end

    def attendance_params
      params.require(:attendance).permit(:student_id, :status, :session_id)
    end
  end
end
