# frozen_string_literal: true

module Api
  module V1
    module Principals
      class TeachersController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_teachers, only: %i[index]
        before_action :set_teacher, only: %i[show update destroy]

        def index
          teachers = current_college.teachers.includes(:user, :college).where(@conditions)
          @pagy, @teachers = pagy(teachers, items: @per_page, page: @page)
          json_response(
            teachers: TeacherSerializer.new(@teachers).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            teacher: TeacherSerializer.new(@teacher).serializable_hash[:data][:attributes]
          })
        end

        def create
          @teacher = current_college.teachers.new(teacher_params)
          
          if @teacher.save
            json_response(
              {
                message: 'Teacher created successfully',
                teacher: TeacherSerializer.new(@teacher).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@teacher.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @teacher.update(teacher_params)
            json_response(
              {
                message: 'Teacher updated successfully',
                teacher: TeacherSerializer.new(@teacher).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@teacher.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @teacher.destroy
          json_response(
            {
              message: 'Teacher deleted successfully'
            },
            :ok
          )
        end

        private

        def set_teacher
          @teacher = current_college.teachers.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Teacher not found' }, :not_found)
        end

        def teacher_params
          params.require(:teacher).permit(:name, :email, :phone, :address, :department)
        end
        
        def filter_teachers
          build_condition :search, operator: 'ilike', column: 'name'
          build_condition :search, operator: 'ilike', column: 'email'
          build_condition :department
        end
      end
    end
  end
end
