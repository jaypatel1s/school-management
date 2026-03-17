# frozen_string_literal: true

module Api
  module V1
    module Principals
      class StudentsController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_students, only: %i[index]
        before_action :set_student, only: %i[show update destroy]

        def index
          students = current_college.students.includes(:user, :college).where(@conditions)
          @pagy, @students = pagy(students, items: @per_page, page: @page)
          json_response(
            students: StudentSerializer.new(@students).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            student: StudentSerializer.new(@student).serializable_hash[:data][:attributes]
          })
        end

        def create
          @student = current_college.students.new(student_params)
          
          if @student.save
            json_response(
              {
                message: 'Student created successfully',
                student: StudentSerializer.new(@student).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@student.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @student.update(student_params)
            json_response(
              {
                message: 'Student updated successfully',
                student: StudentSerializer.new(@student).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@student.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @student.destroy
          json_response(
            {
              message: 'Student deleted successfully'
            },
            :ok
          )
        end

        private

        def set_student
          @student = current_college.students.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Student not found' }, :not_found)
        end

        def student_params
          params.require(:student).permit(:name, :roll_number, :email, :phone, :address)
        end
        
        def filter_students
          build_condition :search, operator: 'ilike', column: 'name'
          build_condition :search, operator: 'ilike', column: 'roll_number'
          build_condition :search, operator: 'ilike', column: 'email'
        end
      end
    end
  end
end
