# frozen_string_literal: true

# :nodoc:
class AdmissionApplicationsController < ApplicationController
  before_action :set_admission_application,
                only: %i[upload_document show validate_token update destroy regenerate_token]
  before_action :set_admission,
                only: %i[upload_document show validate_token index new create update destroy regenerate_token]

  def index
    @admission_applications = @admission.admission_applications.includes(:course, :department, :college)
  end

  def show; end

  def new
    @admission_application = @admission.admission_applications.new
    @colleges = College.joins(:admission_college_actives)
                       .where(admission_college_actives: { active: true })
                       .distinct
  end

  def create
    @admission_application = @admission.admission_applications.new(admission_application_params)
    if @admission_application.save
      AdmissionMailer.temporary_token(@admission_application).deliver_later
      flash[:success] = 'Admission application submitted successfully'
      redirect_to public_admission_admission_applications_path
    else
      flash[:alert] = @admission_application.errors.full_messages
      render :new
    end
  end

  def update
    if @admission_application.update(application_params)
      flash[:success] = 'Admission application updated successfully'
    else
      flash[:alert] = @admission_application.errors.full_messages
    end
    redirect_to public_admission_admission_applications_path
  end

  def destroy
    @admission_application.destroy
    flash[:success] = 'Admission application deleted successfully'
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

  def validate_token
    @document_types = DocumentType.where(college_id: @admission_application.college_id)
    @validate_attempt = true

    @token_matched =
      params[:application_number] == @admission_application.application_number &&
      params[:temporary_token] == @admission_application.temporary_token

    flash.now[:success] = 'Validation successful. You can now upload your documents'
    render :show
  end

  def upload_document
    file = params.dig(:admission_document, :file)
    doc_type_id = params[:document_type_id]

    if file.present? && doc_type_id.present?
      @admission.admission_documents.create!(
        document_type_id: doc_type_id,
        file: file
      )
      @admission.update(status: 'under_review') if @admission.status == 'document_upload_pending'
      flash[:success] = 'Document uploaded successfully.'
    else
      flash[:alert] = 'Missing file or document type.'
    end
    redirect_to public_admission_path(@admission.slug)
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
    params.require(:admission_application).permit(:name, :email, :phone, :status, :college_id, :course_id,
                                                  :department_id)
  end
end
