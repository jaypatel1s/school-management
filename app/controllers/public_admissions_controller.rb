# frozen_string_literal: true

# :nodoc:
class PublicAdmissionsController < ApplicationController
  before_action :set_admission, only: %i[show validate_token upload_document remove_document]

  # GET /public_admissions
  # GET /public_admissions.json
  def index
    @admissions = Admission.active.where(user_id: nil)
  end

  def show
    return redirect_to new_public_admission_path, alert: 'Invalid or expired application.' unless @admission

    @document_types = DocumentType.where(college_id: @admission.college_id)
  end

  def new
    @admission = Admission.new
    @college = College.all
  end

  def validate_token
    return redirect_to public_admissions_path, alert: 'Invalid or expired application.' unless @admission

    @document_types = DocumentType.where(college_id: @admission.college_id)

    @validate_attempt = true
    @token_matched =
      params[:application_number] == @admission.application_number &&
      params[:temporary_token] == @admission.temporary_token

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
    @admission = Admission.find_by(slug: params[:slug])
    return redirect_to public_admissions_path, alert: 'Invalid admission' unless @admission

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
      format.js # renders remove_document.js.erb
      format.html { redirect_to public_admission_path(@admission.slug) }
    end
  end

  private

  def set_admission
    @admission = Admission.find_by(slug: params[:slug])
    return if @admission.present?

    flash[:notice] = 'Admission Not Found'
    redirect_to public_admissions_path
  end

  def admission_params
    params.require(:admission).permit(
      :name, :course_id, :department_id, :email, :phone, :college_id
    )
  end
end
