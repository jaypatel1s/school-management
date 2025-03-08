class CoursesController < BaseController
  before_action :set_department
  before_action :set_course, only: %i[show edit update destroy]

  def index
    @courses =  @department.courses
  end

  def new
    @course = @department.courses.new
  end

  def show; end

  def edit; end

  def create
    @course = @department.courses.new(courses_params)
    @course.college_id = current_college.id
    if @course.save
      flash[:success] = 'Courses Created Successfully'
      redirect_to college_department_courses_path(current_college.slug)
    else
      flash[:alert] = @course.errors.full_messages
      render :new
    end
  end

  def update
    if @course.update(courses_params)
      flash[:success] = 'Courses Updated Successfully.'
      redirect_to college_department_courses_path(current_college.slug)
    else
      flash[:alert] = @course.errors.full_messages
      render :edit
    end
  end

  def destroy
    @course.destroy
    flash[:success] = 'Courses Deleted Successfully'
    redirect_to college_department_courses_path(current_college.slug)
  end

  private

  def set_course
    @course = @department.courses.find_by(slug: params[:slug])
    return if @course.present?

    flash[:notice] = 'Courses Not Found'
    redirect_to college_department_courses_path(current_college.slug)
  end

  def set_department
    @department = current_college.departments.find_by(slug: params[:department_slug])
    return if @department.present?

    flash[:notice] = 'Department Not Found'
    redirect_to college_department_courses_path(current_college.slug)
  end

  def courses_params
    params.require(:course).permit(
      :name, :college_id, :department_id, :teacher_id, :credits
    )
  end
end
