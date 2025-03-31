# frozen_string_literal: true

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
    @fee_structure = current_college.fee_structures.new(fee_structures_params)
    if @fee_structure.save
      flash[:success] = 'Fee Created Successfully'
      redirect_to college_fee_structures_path(current_college.slug)
    else
      flash[:alert] = @fee_structure.errors.full_messages
      render :new
    end
  end

  def update
    if @fee_structure.update(fee_structures_params)
      flash[:success] = 'Fee Updated Successfully.'
      redirect_to college_fee_structures_path(current_college.slug)
    else
      flash[:alert] = @fee_structure.errors.full_messages
      render :edit
    end
  end

  def destroy
    @fee_structure.destroy
    flash[:success] = 'Fee Deleted Successfully'
    redirect_to college_fee_structures_path(current_college.slug)
  end

  private

  def set_fee_structure
    @fee_structure = current_college.fee_structures.find_by(slug: params[:slug])
    return if @fee_structure.present?

    flash[:notice] = 'Fee Not Found'
    redirect_to college_fee_structures_path(current_college.slug)
  end

  def fee_structures_params
    params.require(:fee_structure).permit(
      :classroom_id, :college_id, :tuition_fee, :other_expense, :total_fee, :name
    )
  end
end
