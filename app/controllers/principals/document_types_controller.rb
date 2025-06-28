# frozen_string_literal: true

module Principals
  # :nodoc:
  class DocumentTypesController < BaseController
    before_action :set_document_type, only: %i[edit update destroy]

    def index
      @document_types = current_college.document_types
    end

    def new
      @document_type = current_college.document_types.new
    end

    def edit; end

    def create
      @document_type = current_college.document_types.new(document_type_params)
      if @document_type.save
        flash[:success] = 'Document Type Created Successfully'
        redirect_to college_principals_document_types_path(current_college.slug)
      else
        flash[:alert] = @document_type.errors.full_messages
        render :new
      end
    end

    def update
      if @document_type.update(document_type_params)
        flash[:success] = 'Document Type Updated Successfully.'
        redirect_to college_principals_document_types_path(current_college.slug)
      else
        flash[:alert] = @document_type.errors.full_messages
        render :edit
      end
    end

    def destroy
      @document_type.destroy
      flash[:success] = 'Document Type Deleted Successfully'
      redirect_to college_principals_document_types_path(current_college.slug)
    end

    private

    def set_document_type
      @document_type = current_college.document_types.find_by(id: params[:id])
      return if @document_type.present?

      flash[:notice] = 'Document Type Not Found'
      redirect_to college_principals_document_types_path(current_college.slug)
    end

    def document_type_params
      params.require(:document_type).permit(:name, :required)
    end
  end
end
