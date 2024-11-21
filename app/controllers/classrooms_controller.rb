class ClassroomsController < BaseController
  before_action :set_classroom, only: %i[show edit update destroy]

  def index
    @classrooms = current_user.classrooms.all
  end

  def new
    @classroom = current_user.classroom.new
  end

  def show; end

  def edit; end

  def create
    @classroom = Classroom.new(classroom_params)
    @classroom.college_id = current_user.college_id
    if @classroom.save
      flash[:success] = 'Classroom Created Successfully'
      redirect_to classrooms_path
    else
      flash[:alert] = @classroom.errors.full_messages
      render :new
    end
  end

  def update
    if @classroom.update(classroom_params)
      flash[:success] = 'Classroom Updated Successfully.'
      redirect_to classrooms_path
    else
      flash[:alert] = @classroom.errors.full_messages
      render :edit
    end
  end

  def destroy
    @classroom.destroy
    flash[:success] = 'Classroom Deleted Successfully'
    redirect_to classrooms_path
  end

  private

  def set_classroom
    @classroom = Classroom.find_by(slug: params[:slug])
    return if @classroom.present?

    flash[:notice] = 'Classroom Not Found'
    redirect_to classrooms_path
  end

  def classroom_params
    params.require(:classroom).permit(
      :name, :college_id
    )
  end
end
