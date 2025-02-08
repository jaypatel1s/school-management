class FeeTypesController < BaseController
  before_action :set_fee_type, only: %i[show edit update destroy]

  def index
    @fee_types = current_college.fee_types
  end

  def new
    @fee_type = current_college.fee_types.new
  end

  def show; end

  def edit; end

  def create
    @fee_type = current_college.fee_types.new(fee_type_params)
    @fee_type.college_id = current_college.id
    if @fee_type.save
      flash[:success] = 'Fee Type Created Successfully'
      redirect_to college_fee_types_path(current_college.slug)
    else
      flash[:alert] = @fee_type.errors.full_messages
      render :new
    end
  end  


  def update
    if @fee_type.update(fee_type_params)
      flash[:success] = 'Fee Type Updated Successfully.'
      redirect_to college_fee_types_path(current_college.slug)
    else
      flash[:alert] = @fee_type.errors.full_messages
      render :edit
    end
  end

  def destroy
    @fee_type.destroy
    flash[:success] = 'fee_type Deleted Successfully'
    redirect_to college_fee_types_path(current_college.slug)
  end

  private

  def fee_type_params
    params.require(:fee_type).permit(:name)
  end

  private

  def set_fee_type
    @fee_type = current_college.fee_types.find_by(slug: params[:slug])
    return if @fee_type.present?

    flash[:notice] = 'Fee Type Not Found'
    redirect_to college_fee_types_path(current_college.slug)
  end
end
