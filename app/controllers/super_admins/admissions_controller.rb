# frozen_string_literal: true

module SuperAdmins
  # :nodoc:
  class AdmissionsController < BaseController
    before_action :set_admission, only: %i[show edit update destroy]

    def index
      @admissions = Admission.all
    end

    def show; end

    def new
      @admission = Admission.new
    end

    def edit; end

    def create
      @admission = Admission.new(admission_params)
      if @admission.save
        create_admission_college_active
        flash[:success] = 'Admission Created Successfully'
        redirect_to super_admins_admissions_path
      else
        flash[:alert] = @admission.errors.full_messages
        render :new
      end
    end

    def update
      if @admission.update(admission_params)
        flash[:success] = 'Admission Updated Successfully.'
        redirect_to super_admins_admissions_path
      else
        flash[:alert] = @admission.errors.full_messages
        render :edit
      end
    end

    def destroy
      @admission.destroy
      flash[:success] = 'Admission Deleted Successfully'
      redirect_to super_admins_admissions_path
    end

    def create_admission_college_active
      colleges = []
      College.find_each do |college|
        admission_college_active = college.admission_college_actives.find_or_initialize_by(admission_id: @admission.id)
        admission_college_active.save
        colleges << college
      end
      AdmissionActiveJob.perform_later(@admission, colleges)
    end

    private

    def set_admission
      @admission = Admission.find_by(slug: params[:slug])
      return if @admission.present?

      flash[:notice] = 'Admission Not Found'
      redirect_to super_admins_admissions_path
    end

    def admission_params
      params.require(:admission).permit(
        :name, :status, :expires_at, :start_date, :end_date, :closed_at
      )
    end
  end
end
