# frozen_string_literal: true

class PublicAdmissionsController < ApplicationController
  before_action :set_admission, only: %i[show validate_token upload_document remove_document]

  def index
    @admissions = Admission.includes(:course, :department, :college).where(user_id: nil)
  end

  def show
    @document_types = DocumentType.where(college_id: @admission.college_id)
  end

  def new
    @admission = Admission.new
    @college = College.all
  end

  def validate_token
    @document_types = DocumentType.where(college_id: @admission.college_id)
    @validate_attempt = true
    @token_matched =
      params[:application_number] == @admission.application_number &&
      params[:temporary_token] == @admission.temporary_token

    flash[:success] = 'Validation successful. You can now upload your documents'
    render :show
  end

  def create
    @admission = Admission.new(admission_params)
    if @admission.save
      flash[:success] = 'Admission Form Submitted Successfully'
      redirect_to public_admissions_path
    else
      flash[:alert] = @admission.errors.full_messages
      render :new
    end
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
    @doc_type_id = params[:document_type_id]
    @document = @admission.admission_documents.find_by(document_type_id: @doc_type_id)
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
        flash[:notice] = 'Token already valid. Email has been re-sent.'
      else
        admission.update(
          temporary_token: SecureRandom.alphanumeric(6),
          expires_at: 1.day.from_now
        )
        AdmissionMailer.temporary_token(admission).deliver_later
        flash[:notice] = 'A new token has been generated and sent to your email.'
      end
    else
      flash[:alert] = 'Admission not found.'
    end

    redirect_to public_admissions_path
  end

  private

  def set_admission
    @admission = Admission.find_by(slug: params[:slug])

    return if @admission && @admission.expires_at > Time.current

    flash[:alert] = 'Token has expired or admission is invalid.'
    redirect_to public_admissions_path
  end

  def admission_params
    params.require(:admission).permit(
      :name, :course_id, :department_id, :email, :phone, :college_id
    )
  end
end
