# frozen_string_literal: true

class AdmissionApplicationsController < ApplicationController
  before_action :set_admission_application, only: %i[show update destroy regenerate_token]
  before_action :set_admission, only: %i[index new create update destroy regenerate_token]

  def index
    @admission_applications = @admission.admission_applications.includes(:course, :department)
  end

  def new
    @admission_application = @admission.admission_applications.new
    @colleges = College.all
  end

  def create
    @admission_application = @admission.admission_applications.new(admission_application_params)
    if @admission_application.save
      flash[:success] = 'Admission application submitted successfully'
      redirect_to public_admission_admission_applications_path
    else
      flash[:alert] = @admission_application.errors.full_messages
      render :new
    end
  end

  def show; end

  def update
    if @admission_application.update(application_params)
      flash[:success] = 'Admission application updated successfully.'
    else
      flash[:alert] = @admission_application.errors.full_messages
    end
    redirect_to public_admission_admission_applications_path
  end

  def destroy
    @admission_application.destroy
    flash[:success] = 'Application deleted.'
    redirect_to public_admission_admission_applications_path
  end

  def departments
    @departments = Department.where(college_id: params[:college_id])
    render json: @departments
  end

  def courses
    @courses = Course.where(department_id: params[:department_id])
    render json: @courses
  end

  def regenerate_token
    if @admission_application
      if @admission_application.expires_at.present? && @admission_application.expires_at.future?
        AdmissionMailer.temporary_token(@admission_application).deliver_later
        flash[:notice] = 'Token still valid. Email resent.'
      else
        @admission_application.update(
          temporary_token: SecureRandom.alphanumeric(6),
          expires_at: 1.day.from_now
        )
        AdmissionMailer.temporary_token(@admission_application).deliver_later
        flash[:notice] = 'New token generated and sent.'
      end
    else
      flash[:alert] = 'Admission not found.'
    end
    redirect_to public_admission_admission_applications_path
  end

  private

  def set_admission_application
    @admission_application = AdmissionApplication.find_by(slug: params[:slug])
  end

  def set_admission
    @admission = Admission.find_by(slug: params[:public_admission_slug])
    return if @admission&.closed_at&.future?

    flash[:alert] = 'Token expired or admission invalid.'
    redirect_to public_admissions_path
  end

  def admission_application_params
    params.require(:admission_application).permit(:name, :email, :phone, :status, :college_id, :course_id, :department_id)
  end
end
