# frozen_string_literal: true

class PublicAdmissionsController < ApplicationController
  before_action :set_admission, only: %i[show validate_token upload_document remove_document]

  def index
    @admissions = Admission.all
  end

  def show
    @admission_applications = @admission.admission_applications
    @document_types = DocumentType.where(college_id: @admission.admission_applications.pluck(:college_id))
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
end
