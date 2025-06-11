# frozen_string_literal: true

module Principals
  # :nodoc:
  class AcademicYearsController < BaseController
    before_action :set_academic_year, only: %i[show edit update destroy]

    def index
      @academic_years = current_college.academic_years
    end

    def show; end

    def new
      @academic_year = current_college.academic_years.new
    end

    def edit; end

    def create
      @academic_year = current_college.academic_years.new(academic_year_params)
      if @academic_year.save
        flash[:success] = 'Academic Year Created Successfully'
        redirect_to college_principals_academic_years_path(current_college.slug)
      else
        flash[:alert] = @academic_year.errors.full_messages
        render :new
      end
    end

    def update
      if @academic_year.update(academic_year_params)
        flash[:success] = 'Academic Year Updated Successfully.'
        redirect_to college_principals_academic_years_path(current_college.slug)
      else
        flash[:alert] = @academic_year.errors.full_messages
        render :edit
      end
    end

    def destroy
      @academic_year.destroy
      flash[:success] = 'Academic Year Deleted Successfully'
      redirect_to college_principals_academic_years_path(current_college.slug)
    end

    private

    def set_academic_year
      @academic_year = current_college.academic_years.find_by(slug: params[:slug])
      return if @academic_year.present?

      flash[:notice] = 'Academic Year Not Found'
      redirect_to college_principals_academic_years_path(current_college.slug)
    end

    def academic_year_params
      params.require(:academic_year).permit(
        :name, :start_date, :end_date, :department_id
      )
    end
  end
end
