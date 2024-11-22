class SubjectsController < BaseController
  before_action :set_subject, only: %i[show edit update destroy]

  def index
    @subjects = current_college.subjects
  end

  def new
    @subject = current_college.subjects.new
  end

  def show; end

  def edit; end

  def create
    @subject = current_college.subjects.new(subject_params)
    if @subject.save
      flash[:success] = 'Subject Created Successfully'
      redirect_to subjects_path
    else
      flash[:alert] = @subject.errors.full_messages
      render :new
    end
  end

  def update
    if @subject.update(subject_params)
      flash[:success] = 'Subject Updated Successfully.'
      redirect_to subjects_path
    else
      flash[:alert] = @subject.errors.full_messages
      render :edit
    end
  end

  def destroy
    @subject.destroy
    flash[:success] = 'Subject Deleted Successfully'
    redirect_to subjects_path
  end

  private

  def set_subject
    @subject = current_college.subjects.find_by(slug: params[:slug])
    return if @subject.present?

    flash[:notice] = 'Subject Not Found'
    redirect_to subjects_path
  end

  def subject_params
    params.require(:subject).permit(
      :name, :college_id, :description, classroom_subjects_attributes: %i[id classroom_id _destroy]
    )
  end
end
