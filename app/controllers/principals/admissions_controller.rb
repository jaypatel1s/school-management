# frozen_string_literal: true

module Principals
  # :nodoc:
  class AdmissionsController < BaseController
    before_action :set_admission, only: %i[show edit update destroy]

    def index
      @admissions = current_college.admissions.includes(:department, :course)
    end

    def show; end

    def new
      @admission = current_college.admissions.new
    end

    def edit; end

    def create
      @admission = current_college.admissions.new(admission_params)
      if @admission.save
        flash[:success] = 'Admission Created Successfully'
        redirect_to college_principals_admissions_path(current_college.slug)
      else
        flash[:alert] = @admission.errors.full_messages
        render :new
      end
    end

    def update
      if @admission.update(admission_params)
        flash[:success] = 'Admission Updated Successfully.'
        redirect_to college_principals_admissions_path(current_college.slug)
      else
        flash[:alert] = @admission.errors.full_messages
        render :edit
      end
    end

    def destroy
      @admission.destroy
      flash[:success] = 'Admission Deleted Successfully'
      redirect_to college_principals_admissions_path(current_college.slug)
    end

    private

    def set_admission
      @admission = current_college.admissions.find_by(slug: params[:slug])
      return if @admission.present?

      flash[:notice] = 'Admission Not Found'
      redirect_to college_principals_admissions_path(current_college.slug)
    end

    def admission_params
      params.require(:admission).permit(
        :name, :course_id, :department_id, :user_id, :email, :phone, :status, :processed_by_id
      )
    end
  end
end
