class FeesController < BaseController
  before_action :set_department
  before_action :set_course
  before_action :set_fee, only: %i[show edit update destroy]

  def index
    @fees = current_college.fees
  end

  def new
    @fee = current_college.fees.new
  end

  def show; end

  def edit; end

  def create
    @fee = current_college.fees.new(fee_params)
    @fee.college_id = current_college.id
    if @fee.save
      flash[:success] = 'Fees Created Successfully'
      redirect_to college_fees_path(current_college.slug)
    else
      flash[:alert] = @fee.errors.full_messages
      render :new
    end
  end  


  def update
    if @fee.update(fee_params)
      flash[:success] = 'Fees Updated Successfully.'
      redirect_to college_fees_path(current_college.slug)
    else
      flash[:alert] = @fee.errors.full_messages
      render :edit
    end
  end

  def destroy
    @fee.destroy
    flash[:success] = 'Fees Deleted Successfully'
    redirect_to college_fees_path(current_college.slug)
  end

  private

  def fee_params
    params.require(:fee).permit(:name)
  end

  def set_department
    @department = current_college.departments.find_by(slug: params[:department_slug])
    return if @department.present?

    flash[:notice] = 'Department Not Found'
    redirect_to college_departments_path(current_college.slug)
  end


  def set_course
    @course = @department.courses.find_by(slug: params[:course_slug])
    return if @course.present?

    flash[:notice] = 'Courses Not Found'
    redirect_to college_department_courses_path(current_college.slug)
  end
  
  def set_fee
    @fee = current_college.fees.find_by(slug: params[:slug])
    return if @fee.present?

    flash[:notice] = 'Fee Type Not Found'
    redirect_to college_fees_path(current_college.slug)
  end
end
