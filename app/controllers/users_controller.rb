class UsersController < BaseController
  before_action :set_user, only: %i[show edit update destroy]

  def index
    if current_user.principal?
      @users = User.all
    else
      @users = User.where(role: 'student')
    end
  end

  def new
    @user = User.new
  end

  def show; end
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
      flash[:success] = 'User Updated Successfully.'
      redirect_to users_path
    else
      flash[:alert] = @user.errors.full_messages
      render :edit
    end
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
    params.require(:user).permit(
      :name, :email, :role, :college_id, :password, :password_confirmation
    )
  end
end
