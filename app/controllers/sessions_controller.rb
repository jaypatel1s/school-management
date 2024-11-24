class SessionsController < BaseController
  before_action :set_classroom
  before_action :set_session, only: %i[show edit update destroy]

  def index
    @sessions = @classroom.sessions
  end

  def new
    @session = @classroom.sessions.new
  end

  def show; end

  def edit; end

  def create
    @session = @classroom.sessions.new(session_params)
    @session.college_id = current_college.id
    if @session.save
      flash[:success] = 'Session Created Successfully'
      redirect_to college_classroom_sessions_path(current_college.slug, classroom_slug: @classroom.slug)
    else
      flash[:alert] = @session.errors.full_messages
      render :new
    end
  end

  def update
    if @session.update(session_params)
      flash[:success] = 'Session Updated Successfully.'
      redirect_to college_classroom_sessions_path(current_college.slug, classroom_slug: @classroom.slug)
    else
      flash[:alert] = @session.errors.full_messages
      render :edit
    end
  end

  def destroy
    @session.destroy
    flash[:success] = 'Session Deleted Successfully'
    redirect_to college_classroom_sessions_path(current_college.slug)
  end

  private

  def set_classroom
    @classroom = current_college.classrooms.find_by(slug: params[:classroom_slug])
    return if @classroom.present?

    flash[:notice] = 'Classroom Not Found'
    redirect_to classrooms_path
  end

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
