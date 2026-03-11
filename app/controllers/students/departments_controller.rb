# frozen_string_literal: true

module Students
  # :nodoc:
  class DepartmentsController < BaseController
    def index
      @departments = current_college.departments.includes(:courses).order(:name)
    end

    def show
      @department = current_college.departments.includes(:courses).find_by(slug: params[:slug])
      return if @department.present?

      flash[:notice] = 'Department Not Found'
      redirect_to college_students_departments_path(current_college.slug)
    end
  end
end
