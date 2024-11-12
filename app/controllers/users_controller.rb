class UsersController < BaseController

  def index
    @users = User.where(role: 'teacher')
  end

  def new
    @user = User.new
  end

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
  private

  def user_params
    params.require(:user).permit(
      :name, :email, :role, :college_id, :password, :password_confirmation
    )
  end
end
