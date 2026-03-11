# frozen_string_literal: true

module Students
  # :nodoc:
  class UsersController < BaseController
    before_action :set_user, only: %i[show edit update]

    def show; end

    def edit; end

    def update
      if @user.update(user_params)
        flash[:success] = 'Profile updated successfully.'
        redirect_to college_students_user_path(current_college.slug, @user.slug)
      else
        flash.now[:alert] = @user.errors.full_messages
        render :edit, status: :unprocessable_entity
      end
    end

    private

    def set_user
      @user = current_college.users.find_by(slug: params[:slug])
      return if @user.present? && @user == @profile.user

      flash[:notice] = 'User Not Found'
      redirect_to college_students_dashboard_path(current_college.slug)
    end

    def user_params
      params.require(:user).permit(:name, :email, :phone)
    end
  end
end
