# frozen_string_literal: true

module Principals
  # :nodoc:
  class FeeStructuresController < BaseController
    before_action :set_fee_structure, only: %i[show edit update destroy]

    def index
      @fee_structures = current_college.fee_structures
    end

    def show; end

    def new
      @fee_structure = current_college.fee_structures.new
    end

    def edit; end

    def create
      @fee_structure = current_college.fee_structures.new(fee_structure_params)
      if @fee_structure.save
        flash[:success] = 'Fee Structure Created Successfully'
        redirect_to college_principals_fee_structures_path(current_college.slug)
      else
        flash[:alert] = @fee_structure.errors.full_messages
        render :new
      end
    end

    def update
      if @fee_structure.update(fee_structure_params)
        flash[:success] = 'Fee Structure Updated Successfully.'
        redirect_to college_principals_fee_structures_path(current_college.slug)
      else
        flash[:alert] = @fee_structure.errors.full_messages
        render :edit
      end
    end

    def destroy
      @fee_structure.destroy
      flash[:success] = 'Fee Structure Deleted Successfully'
      redirect_to college_principals_fee_structures_path(current_college.slug)
    end

    private

    def set_fee_structure
      @fee_structure = current_college.fee_structures.find_by(slug: params[:slug])
      return if @fee_structure.present?

      flash[:notice] = 'Fee Structure Not Found'
      redirect_to college_principals_fee_structures_path(current_college.slug)
    end

    def fee_structure_params
      params.require(:fee_structure).permit(
        :name, :description, :total_amount, :academic_year_id, :department_id
      )
    end
  end
end