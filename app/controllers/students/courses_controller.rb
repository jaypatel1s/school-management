# frozen_string_literal: true

module Students
  # :nodoc:
  class CoursesController < BaseController
    def index
      @courses = @profile.courses.includes(:department, :teacher).order(:name)
    end

    def show
      @course = @profile.courses.includes(:department, :teacher, :assignments, :sessions).find_by(slug: params[:slug])
      return if @course.present?

      flash[:notice] = 'Course Not Found'
      redirect_to college_students_courses_path(current_college.slug)
    end
  end
end
