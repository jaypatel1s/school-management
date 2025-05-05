# frozen_string_literal: true

# :nodoc:
module Teachers
  class SessionsController < BaseController
    before_action :set_session, only: %i[show edit update destroy]

    def index
      @sessions = @profile.sessions
    end

    def show; end

    def new
      @session = @profile.sessions.new
    end

    def edit; end

    def create
      @session = @profile.sessions.new(session_params)
      @session.college_id = @profile.college_id
      @session.department_id = @profile.department_id
      @session.course_id = @profile.course_id
      if @session.save
        flash[:success] = 'Session Created Successfully'
        redirect_to college_teachers_sessions_path(current_college.slug)
      else
        flash[:alert] = @session.errors.full_messages
        render :new
      end
    end

    def update
      if @session.update(session_params)
        flash[:success] = 'Session Updated Successfully.'
        redirect_to college_teachers_sessions_path(current_college.slug)
      else
        flash[:alert] = @session.errors.full_messages
        render :edit
      end
    end

    def destroy
      @session.destroy
      flash[:success] = 'Session Deleted Successfully'
      redirect_to college_teachers_sessions_path(current_college.slug)
    end

    private

    def set_session
      @session = current_college.sessions.find_by(slug: params[:slug])
      return if @session.present?

      flash[:notice] = 'Session Not Found'
      redirect_to college_principals_sessions_path(current_college.slug)
    end

    def session_params
      params.require(:session).permit(:name, :date)
    end
  end
end
