# frozen_string_literal: true

module Users
  # :nodoc:
  class RegistrationsController < Devise::RegistrationsController
    layout 'authentication'
    before_action :assign_company, only: :create

    def create
      build_resource(registration_params)
      resource.company = @company
      resource.role = 'Admin'
      if resource.email.present? && resource.save
        set_flash_message :notice, :signed_up_but_unconfirmed if is_navigational_format?
        sign_up(resource_name, resource)
        respond_with resource, location: new_jira_site_path
      else
        flash[:alert] = t(
          'devise.registrations.fill_data'
        )
        respond_with resource, location: new_user_registration_path
      end
    end

    private

    def assign_company
      @company = Company.create(name: params[:company_name])
      return if @company.errors.blank?

      build_resource(registration_params) if resource.nil?

      resource.errors.add(:company_name, @company.errors[:name])
      respond_with resource, location: new_user_registration_path
    end

    def registration_params
      params.require(:user).permit(
        :first_name, :middle_name, :last_name,
        :email, :password, :company_name, :password_confirmation
      )
    end
  end
end
