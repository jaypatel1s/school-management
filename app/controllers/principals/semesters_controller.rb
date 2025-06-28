# frozen_string_literal: true

# :nodoc:
module Principals
  class SemestersController < BaseController
    before_action :set_semester, only: %i[show edit update destroy]

    def index
      @semesters = current_college.semesters
    end

    def show; end

    def new
      @semester = current_college.semesters.new
    end

    def edit; end

    def create
      @semester = current_college.semesters.new(semester_params)
      if @semester.save
        flash[:success] = 'Semester Created Successfully'
        redirect_to college_principals_semesters_path(current_college.slug)
      else
        flash[:alert] = @semester.errors.full_messages
        render :new
      end
    end

    def update
      if @semester.update(semester_params)
        flash[:success] = 'Semester Updated Successfully.'
        redirect_to college_principals_semesters_path(current_college.slug)
      else
        flash[:alert] = @semester.errors.full_messages
        render :edit
      end
    end

    def destroy
      @semester.destroy
      flash[:success] = 'Semester Deleted Successfully'
      redirect_to college_principals_semesters_path(current_college.slug)
    end

    private

    def set_semester
      @semester = current_college.semesters.find_by(slug: params[:slug])
      return if @semester.present?

      flash[:notice] = 'Semester Not Found'
      redirect_to college_principals_semesters_path(current_college.slug)
    end

    def semester_params
      params.require(:semester).permit(:name)
    end
  end
end
