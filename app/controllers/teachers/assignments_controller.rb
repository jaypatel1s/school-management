# frozen_string_literal: true

# :nodoc:
module Teachers
  class AssignmentsController < BaseController
    before_action :set_assignment, only: %i[show edit update destroy]
    def index
      @assignments = @profile.assignments
    end

    def new
      @assignment = @profile.assignments.new
    end


    def edit; end

    def create
      @assignment = @profile.assignments.new(assignment_params)
      @assignment.department_id = @profile.department_id
      @assignment.course_id = @profile.course_id
      @assignment.college_id = @profile.college_id
      if @assignment.save
        flash[:success] = "Assignment added successfully"
        redirect_to college_teachers_assignments_path
      else
        flash[:alert] = "Assignment creation failed"
        render :new
      end
    end

    def update
      if @assignment.update(assignment_params)
        flash[:success] = 'Assignment Updated Successfully.'
        redirect_to college_teachers_assignments_path(current_college.slug)
      else
        flash[:alert] = @assignment.errors.full_messages
        render :edit
      end
    end

    def destroy
      @assignment.destroy
      flash[:success] = 'Assignment Deleted Successfully'
      redirect_to college_teachers_assignments_path(current_college.slug)
    end

    private

    def set_assignment
      @assignment = current_college.assignments.find_by(slug: params[:slug])
      return if @assignment.present?

      flash[:notice] = 'Assignment Not Found'
      redirect_to college_teachers_assignments_path
    end

    def assignment_params
      params.require(:assignment).permit(:name, :description, :file)
    end
  end
end
