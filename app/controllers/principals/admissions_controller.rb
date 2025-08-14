# frozen_string_literal: true

module Principals
  class AdmissionsController < BaseController
    before_action :set_admission, only: %i[show change_status]

    def index
      @admissions = Admission.all
    end

    def show
      @applications = @admission.admission_applications
                                .where(college_id: current_college.id)
                                .includes(:course, :department, :student)
    end

    def change_status
      admission_college_active = current_college.admission_college_actives.find_or_initialize_by(
        admission_id: @admission&.id
      )

      if admission_college_active.persisted?
        admission_college_active.active? ? admission_college_active.deactivate : admission_college_active.activate
        flash[:success] = "Admission #{admission_college_active.active? ? 'activated' : 'deactivated'}"
      else
        admission_college_active.activate
        flash[:success] = 'Admission activated'
      end
      redirect_to college_principals_admissions_path(current_college.slug)
    end

    private

    def set_admission
      @admission = Admission.find_by(slug: params[:slug])
    end
  end
end
