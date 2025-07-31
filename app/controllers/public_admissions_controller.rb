# frozen_string_literal: true

class PublicAdmissionsController < ApplicationController
  before_action :set_admission, only: %i[show validate_token upload_document remove_document]

  def index
    @admissions = Admission.where(user_id: nil)
  end

  def show
    @document_types = DocumentType.where(college_id: @admission.admission_applications.pluck(:college_id))
  end

  def new
    @admission = Admission.new
    @colleges = College.all
  end

  def create
    @admission = Admission.new(admission_params)
    if @admission.save
      @admission.admission_applications.create(application_params) if application_params[:college_id].present?
      flash[:success] = 'Admission Form Submitted Successfully'
      redirect_to public_admissions_path
    else
      flash[:alert] = @admission.errors.full_messages
      render :new
    end
  end

  def validate_token
    college_ids = @admission.admission_applications.pluck(:college_id)
    @document_types = DocumentType.where(college_id: college_ids)
    @validate_attempt = true

    @token_matched =
      params[:application_number] == @admission.application_number &&
      params[:temporary_token] == @admission.temporary_token

    flash.now[:success] = 'Validation successful. You can now upload your documents'
    render :show
  end

  def departments
    @departments = Department.where(college_id: params[:college_id])
    render json: @departments
  end

  def courses
    @courses = Course.where(department_id: params[:department_id])
    render json: @courses
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

  def remove_document
    @document = @admission.admission_documents.find_by(document_type_id: params[:document_type_id])
    @document&.destroy

    flash[:success] = 'Document removed successfully.'
    respond_to do |format|
      format.js
      format.html { redirect_to public_admission_path(@admission.slug) }
    end
  end

  def regenerate_token
    admission = Admission.find_by(slug: params[:slug])
    if admission
      if admission.expires_at.present? && admission.expires_at.future?
        AdmissionMailer.temporary_token(admission).deliver_later
        flash[:notice] = 'Token still valid. Email resent.'
      else
        admission.update(
          temporary_token: SecureRandom.alphanumeric(6),
          expires_at: 1.day.from_now
        )
        AdmissionMailer.temporary_token(admission).deliver_later
        flash[:notice] = 'New token generated and sent.'
      end
    else
      flash[:alert] = 'Admission not found.'
    end
    redirect_to public_admissions_path
  end

  private

  def set_admission
    @admission = Admission.find_by(slug: params[:slug])
    return if @admission&.expires_at&.future?

    flash[:alert] = 'Token expired or admission invalid.'
    redirect_to public_admissions_path
  end

  def admission_params
    params.require(:admission).permit(:name, :email, :phone)
  end

  def application_params
    params.require(:admission).permit(:college_id, :department_id, :course_id)
  end
end
