# frozen_string_literal: true

# :nodoc:
class SessionsController < BaseController
  before_action :set_session, only: %i[show edit update destroy]

  def index
    @sessions = if current_user.principal?
                  current_college.sessions
                else
                  current_user.sessions
                end
  end

  def show; end

  def new
    @session = current_college.sessions.new
  end

  def edit; end

  def create
    @session = current_college.sessions.new(session_params)
    if @session.save
      flash[:success] = 'Session Created Successfully'
      redirect_to college_sessions_path(current_college.slug)
    else
      flash[:alert] = @session.errors.full_messages
      render :new
    end
  end

  def update
    if @session.update(session_params)
      flash[:success] = 'Session Updated Successfully.'
      redirect_to college_sessions_path(current_college.slug)
    else
      flash[:alert] = @session.errors.full_messages
      render :edit
    end
  end

  def destroy
    @session.destroy
    flash[:success] = 'Session Deleted Successfully'
    redirect_to college_sessions_path(current_college.slug)
  end

  private

  def set_session
    @session = current_college.sessions.find_by(slug: params[:slug])
    return if @session.present?

    flash[:notice] = 'Session Not Found'
    redirect_to sessions_path
  end

  def session_params
    params.require(:session).permit(
      :name, :date, :college_id, :classroom_id
    )
  end
end
