# frozen_string_literal: true

# :nodoc:
module Principal
  class UsersController < BaseController
    before_action :set_user, only: %i[show edit update destroy]

    def index
      @users = current_college.users
    end

    def show; end

    def new
      @user = current_college.users.new
    end

    def edit; end

    def create
      @user = current_college.users.new(user_params)
      if @user.save
        flash[:success] = 'User Created Successfully'
        redirect_to college_principal_users_path(current_college.slug)
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
        redirect_to college_principal_users_path(current_college.slug)
      else
        flash[:alert] = @user.errors.full_messages
        render :edit
      end
    end

    def profile_setup
      @user = current_user
    end

    def new_webauthn_registration
      options = WebAuthn::Credential.options_for_create(user: current_user.webauthn_user)
      render json: options
    end

    def create_webauthn_registration
      credential = WebAuthn::Credential.from_create(params.require(:webauthn_credential))
      begin
        credential.verify(params[:challenge])
        current_user.webauthn_credentials.create!(
          external_id: credential.id,
          public_key: credential.public_key,
          sign_count: credential.sign_count
        )
        render json: { success: true }
      rescue StandardError => e
        render json: { success: false, error: e.message }
      end
    end


    def destroy
      @user.destroy
      flash[:success] = 'User Deleted Successfully'
      redirect_to college_principal_users_path(current_college.slug)
    end

    private

    def set_user
      @user = current_college.users.find_by(slug: params[:slug])
      return if @user.present?

      flash[:notice] = 'User Not Found'
      redirect_to college_principal_users_path(current_college.slug)
    end

    def user_params
      params.require(:user).permit(
        :name, :email, :role, :college_id, :password, :password_confirmation
      )
    end
  end
end