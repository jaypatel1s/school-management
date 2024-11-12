class UsersController < BaseController

  def index; end
  private

  def user_params
    params.require(:user).permit(
      :email, :role, :college_id, :password, :password_confirmation
    )
  end
end
