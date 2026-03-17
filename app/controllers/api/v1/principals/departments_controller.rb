# frozen_string_literal: true

module Api
  module V1
    module Principals
      class DepartmentsController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_departments, only: %i[index]
        before_action :set_department, only: %i[show update destroy]

        def index
          departments = current_college.departments.includes(:college).where(@conditions)
          @pagy, @departments = pagy(departments, items: @per_page, page: @page)
          json_response(
            departments: DepartmentSerializer.new(@departments).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            department: DepartmentSerializer.new(@department).serializable_hash[:data][:attributes]
          })
        end

        def create
          @department = current_college.departments.new(department_params)
          
          if @department.save
            json_response(
              {
                message: 'Department created successfully',
                department: DepartmentSerializer.new(@department).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@department.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @department.update(department_params)
            json_response(
              {
                message: 'Department updated successfully',
                department: DepartmentSerializer.new(@department).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@department.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @department.destroy
          json_response(
            {
              message: 'Department deleted successfully'
            },
            :ok
          )
        end

        private

        def set_department
          @department = current_college.departments.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Department not found' }, :not_found)
        end

        def department_params
          params.require(:department).permit(:name, :code, :description)
        end
        
        def filter_departments
          build_condition :search, operator: 'ilike', column: 'name'
          build_condition :search, operator: 'ilike', column: 'code'
        end
      end
    end
  end
end
