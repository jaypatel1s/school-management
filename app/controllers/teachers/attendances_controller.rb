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
      @attendance = @profile.attendances.new
    end

    def edit; end

    def create
      @attendance = @profile.attendances.new(attendance_params)
      @attendance.college_id = @profile.college_id
      @attendance.department_id = @profile.department_id
      @attendance.course_id = @profile.course_id
      if @attendance.save
        flash[:success] = 'attendance Created Successfully'
        redirect_to college_teachers_attendances_path(current_college.slug)
      else
        flash[:alert] = @attendance.errors.full_messages
        render :new
      end
    end

    def update
      if @attendance.update(attendance_params)
        flash[:success] = 'attendance Updated Successfully.'
        redirect_to college_teachers_attendances_path(current_college.slug)
      else
        flash[:alert] = @attendance.errors.full_messages
        render :edit
      end
    end

    def destroy
      @attendance.destroy
      flash[:success] = 'attendance Deleted Successfully'
      redirect_to college_teachers_attendances_path(current_college.slug)
    end

    private

    def set_attendance
      @attendance = current_college.attendances.find_by(slug: params[:slug])
      return if @attendance.present?

      flash[:notice] = 'attendance Not Found'
      redirect_to college_principals_attendances_path(current_college.slug)
    end

    def attendance_params
      params.require(:attendance).permit(:name, :date)
    end
  end
end
