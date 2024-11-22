class ClassroomsController < BaseController
  before_action :set_classroom, only: %i[show edit update destroy]

  def index
    @classrooms = current_college.classrooms
  end

  def new
    @classroom = current_college.classrooms.new
  end

  def show; end

  def edit; end

  def create
    @classroom = current_college.classrooms.new(classroom_params)
    if @classroom.save
      flash[:success] = 'Classroom Created Successfully'
      redirect_to college_classrooms_path(current_college.slug)
    else
      flash[:alert] = @classroom.errors.full_messages
      render :new
    end
  end

  def update
    if @classroom.update(classroom_params)
      flash[:success] = 'Classroom Updated Successfully.'
      redirect_to college_classrooms_path(current_college.slug)
    else
      flash[:alert] = @classroom.errors.full_messages
      render :edit
    end
  end

  def destroy
    @classroom.destroy
    flash[:success] = 'Classroom Deleted Successfully'
    redirect_to college_classrooms_path(current_college.slug)
  end

  private

  def set_classroom
    @classroom = current_college.classrooms.find_by(slug: params[:slug])
    return if @classroom.present?

    flash[:notice] = 'Classroom Not Found'
    redirect_to college_classrooms_path(current_college.slug)
  end

  def classroom_params
    params.require(:classroom).permit(
      :name, :college_id
    )
  end
end
