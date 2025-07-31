# frozen_string_literal: true

module Principals
  class AdmissionApplicationsController < BaseController
    before_action :set_admission_application, only: %i[show update destroy]

    def index
      @applications = current_college.admission_applications
                                     .includes(:admission, :course, :department)
    end

    def show; end

    def update
      if @application.update(application_params)
        flash[:success] = 'Application updated successfully.'
      else
        flash[:alert] = @application.errors.full_messages.to_sentence
      end
      redirect_to principals_admission_application_path(@application)
    end

    def destroy
      @application.destroy
      flash[:success] = 'Application deleted.'
      redirect_to principals_admission_applications_path
    end

    private

    def set_admission_application
      @application = current_college.admission_applications.find_by!(slug: params[:slug])
    end

    def application_params
      params.require(:admission_application).permit(:status, :course_id, :department_id)
    end
  end
end
