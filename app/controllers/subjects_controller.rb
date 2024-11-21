class SubjectsController < BaseController
  before_action :set_subject, only: %i[show edit update destroy]

  def index
    @subjects = current_user.subjects.all
  end

  def new
    @subject = current_user.subject.new
  end

  def show; end

  def edit; end

  def create
    @subject = current_user.subject.new(subject_params)
    @subject.college_id = current_user.college_id
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
    @subject = current_user.subjects.find_by(slug: params[:slug])
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
