# frozen_string_literal: true

module Principals
  # :nodoc:
  class DepartmentsController < BaseController
    before_action :set_department, only: %i[show edit update destroy]

    def index
      @departments = current_college.departments
    end

    def show; end

    def new
      @department = current_college.departments.new
    end

    def edit; end

    def create
      @department = current_college.departments.new(department_params)
      if @department.save
        flash[:success] = 'Department Created Successfully'
        redirect_to college_principals_departments_path(current_college.slug)
      else
        flash[:alert] = @department.errors.full_messages
        render :new
      end
    end

    def update
      if @department.update(department_params)
        flash[:success] = 'Department Updated Successfully.'
        redirect_to college_principals_departments_path(current_college.slug)
      else
        flash[:alert] = @department.errors.full_messages
        render :edit
      end
    end

    def destroy
      @department.destroy
      flash[:success] = 'Department Deleted Successfully'
      redirect_to college_principals_departments_path(current_college.slug)
    end

    private

    def set_department
      @department = current_college.departments.find_by(slug: params[:slug])
      return if @department.present?

      flash[:notice] = 'Department Not Found'
      redirect_to college_principals_departments_path(current_college.slug)
    end

    def department_params
      params.require(:department).permit(
        :name, :description
      )
    end
  end
end
