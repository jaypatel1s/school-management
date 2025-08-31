# frozen_string_literal: true

module Principals
  # :nodoc:
  class FeeComponentsController < BaseController
    before_action :set_fee_component, only: %i[show edit update destroy]

    def index
      @fee_components = current_college.fee_components.includes(:fee_structure, :semester).order(created_at: :desc)
    end

    def show; end

    def new
      @fee_component = current_college.fee_components.new
    end

    def edit; end

    def create
      @fee_component = current_college.fee_components.new(fee_component_params)
      if @fee_component.save
        flash[:success] = 'Fee Component Created Successfully'
        redirect_to college_principals_fee_components_path(current_college.slug)
      else
        flash[:alert] = @fee_component.errors.full_messages
        render :new
      end
    end

    def update
      if @fee_component.update(fee_component_params)
        flash[:success] = 'Fee Component Updated Successfully.'
        redirect_to college_principals_fee_components_path(current_college.slug)
      else
        flash[:alert] = @fee_component.errors.full_messages
        render :edit
      end
    end

    def destroy
      @fee_component.destroy
      flash[:success] = 'Fee Component Deleted Successfully'
      redirect_to college_principals_fee_components_path(current_college.slug)
    end

    private

    def set_fee_component
      @fee_component = current_college.fee_components.find_by(slug: params[:slug])
      return if @fee_component.present?

      flash[:notice] = 'Fee Component Not Found'
      redirect_to college_principals_fee_components_path(current_college.slug)
    end

    def fee_component_params
      params.require(:fee_component).permit(
        :name, :description, :amount, :fee_structure_id, :semester_id
      )
    end
  end
end
