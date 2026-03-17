# frozen_string_literal: true

module Api
  module V1
    module Principals
      class AssignmentsController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_assignments, only: %i[index]
        before_action :set_assignment, only: %i[show update destroy]

        def index
          assignments = current_college.assignments.includes(:teacher, :submissions).where(@conditions)
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

        def create
          @assignment = current_college.assignments.new(assignment_params)
          
          if @assignment.save
            json_response(
              {
                message: 'Assignment created successfully',
                assignment: AssignmentSerializer.new(@assignment).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@assignment.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @assignment.update(assignment_params)
            json_response(
              {
                message: 'Assignment updated successfully',
                assignment: AssignmentSerializer.new(@assignment).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@assignment.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @assignment.destroy
          json_response(
            {
              message: 'Assignment deleted successfully'
            },
            :ok
          )
        end

        private

        def set_assignment
          @assignment = current_college.assignments.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Assignment not found' }, :not_found)
        end

        def assignment_params
          params.require(:assignment).permit(:title, :description, :due_date, :teacher_id)
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
