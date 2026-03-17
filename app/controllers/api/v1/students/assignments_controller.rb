# frozen_string_literal: true

module Api
  module V1
    module Students
      class AssignmentsController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_assignments, only: %i[index]
        before_action :set_assignment, only: %i[show]

        def index
          assignments = current_college.assignments.joins(:course).where(courses: { id: current_user.student.course_ids }).includes(:teacher, :submissions).where(@conditions)
          @pagy, @assignments = pagy(assignments, items: @per_page, page: @page)
          json_response(
            assignments: AssignmentSerializer.new(@assignments).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            assignment: AssignmentSerializer.new(@assignment).serializable_hash[:data][:attributes]
          })
        end

        private

        def set_assignment
          @assignment = current_college.assignments.joins(:course).where(courses: { id: current_user.student.course_ids }).find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Assignment not found' }, :not_found)
        end
        
        def filter_assignments
          build_condition :teacher_id
          build_condition :search, operator: 'ilike', column: 'title'
          build_condition :due_date
        end
      end
    end
  end
end
