class ClassroomsController < BaseController
  before_action :set_subject
  before_action :set_classroom, only: %i[show edit update destroy]

  def index
    @classrooms =  @subject.classrooms
  end

  def new
    @classroom = @subject.classrooms.new
  end

  def show; end

  def edit; end

  def create
    @classroom = @subject.classrooms.new(classroom_params)
    @classroom.college_id = current_college.id
    if @classroom.save
      flash[:success] = 'Classroom Created Successfully'
      redirect_to college_subject_classrooms_path(current_college.slug)
    else
      flash[:alert] = @classroom.errors.full_messages
      render :new
    end
  end

  def update
    if @classroom.update(classroom_params)
      flash[:success] = 'Classroom Updated Successfully.'
      redirect_to college_subject_classrooms_path(current_college.slug)
    else
      flash[:alert] = @classroom.errors.full_messages
      render :edit
    end
  end

  def destroy
    @classroom.destroy
    flash[:success] = 'Classroom Deleted Successfully'
    redirect_to college_subject_classrooms_path(current_college.slug)
  end

  private

  def set_classroom
    @classroom = @subject.classrooms.find_by(slug: params[:slug])
    return if @classroom.present?

    flash[:notice] = 'Classroom Not Found'
    redirect_to college_subject_classrooms_path(current_college.slug)
  end

  def set_subject
    @subject = current_college.subjects.find_by(slug: params[:subject_slug])
    return if @subject.present?

    flash[:notice] = 'Subject Not Found'
    redirect_to college_subject_classrooms_path(current_college.slug)
  end

  def classroom_params
    params.require(:classroom).permit(
      :name, :college_id, :subject_id
    )
  end
end
