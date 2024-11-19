# frozen_string_literal: true

# :nodoc:
class UsersController < BaseController
  before_action :set_user, only: %i[show edit update destroy]

  def index
    @users = if current_user.principal?
               User.all
             elsif current_user.teacher? && current_user.teacher_subjects.empty?
               flash[:alert] = 'Please complete your profile setup.'
               redirect_to profile_setup_user_path(current_user.id)
             else
               User.where(role: 'student')
             end
  end

  def show; end

  def new
    @user = User.new
  end

  def edit; end

  def create
    @user = User.new(user_params)
    @user.college_id = current_user.college_id
    if @user.save
      flash[:success] = 'User Created Successfully'
      redirect_to users_path
    else
      flash[:alert] = @user.errors.full_messages
      render :new
    end
  end

  def update
    if @user.update(user_params)

      if params['user']['teacher_subjects_attributes'].present? && current_user.role == 'teacher'
        ApproveTeacherJob.set(wait: 5.minutes).perform_later(current_user)
      end
      flash[:success] = 'User Updated Successfully. Please check after 5 minutes'
      redirect_to users_path
    else
      flash[:alert] = @user.errors.full_messages
      render :edit
    end
  end

  def profile_setup
    @user = current_user
  end

  def destroy
    @user.destroy
    flash[:success] = 'User Deleted Successfully'
    redirect_to users_path
  end

  private

  def set_user
    @user = User.find_by(slug: params[:slug])
    return if @user.present?

    flash[:notice] = 'User Not Found'
    redirect_to users_path
  end

  def user_params
    base_params = params.require(:user).permit(
      :name, :email, :role, :college_id, :password, :password_confirmation,
      teacher_subjects_attributes: [:id, :college_id, :subject_id, :_destroy,
                                    { teacher_classrooms_attributes: %i[id college_id subject_id
                                                                        classroom_id _destroy] }]
    )
    if base_params['teacher_subjects_attributes'].present?
      base_params['teacher_subjects_attributes'].each_value do |value|
        if value['teacher_classrooms_attributes'].present?
          value['teacher_classrooms_attributes'].each_value do |field_value|
            modify_params(field_value)
          end
        end
        modify_params(value)
      end
    end
    base_params
  end
end
