class SessionsController < BaseController
  before_action :set_classroom

  def index
  end

  def update
  end

  private

  def set_classroom
    @classroom = Classroom.find_by(slug: params[:classroom_slug])
    return if @classroom.present?

    flash[:notice] = 'Classroom Not Found'
    redirect_to classrooms_path
  end
end
