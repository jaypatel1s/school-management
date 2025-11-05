# frozen_string_literal: true

module Principals
  # :nodoc:
  class CoursesController < BaseController
    before_action :set_course, only: %i[show edit update destroy]

    def index
      @courses = if current_user.principal?
                   current_college.courses.includes(:department)
                 else
                   current_user.courses.includes(:department)
                 end
    end

    def show; end

    def new
      @course = current_college.courses.new
      @academic_years = current_college.academic_years
      @semesters = current_college.semesters
    end

    def edit; end

    def create
      @course = current_college.courses.new(course_params)
      if @course.save
        flash[:success] = 'Courses Created Successfully'
        redirect_to college_principals_courses_path(current_college.slug)
      else
        flash[:alert] = @course.errors.full_messages
        render :new
      end
    end

    def update
      if @course.update(course_params)
        flash[:success] = 'Courses Updated Successfully.'
        redirect_to college_principals_courses_path(current_college.slug)
      else
        flash[:alert] = @course.errors.full_messages
        render :edit
      end
    end

    def destroy
      @course.destroy
      flash[:success] = 'Courses Deleted Successfully'
      redirect_to college_principals_courses_path(current_college.slug)
    end

    private

    def set_course
      @course = current_college.courses.find_by(slug: params[:slug])
      return if @course.present?

      flash[:notice] = 'Courses Not Found'
      redirect_to college_principals_courses_path(current_college.slug)
    end

    def course_params
      params.require(:course).permit(:name, :department_id, :credits,
                                     course_semesters_attributes: %i[id academic_year_id semester_id _destroy])
    end
  end
end
