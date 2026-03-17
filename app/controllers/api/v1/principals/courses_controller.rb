# frozen_string_literal: true

module Api
  module V1
    module Principals
      class CoursesController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_courses, only: %i[index]
        before_action :set_course, only: %i[show update destroy]

        def index
          courses = current_college.courses.includes(:college, :department).where(@conditions)
          @pagy, @courses = pagy(courses, items: @per_page, page: @page)
          json_response(
            courses: CourseSerializer.new(@courses).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            course: CourseSerializer.new(@course).serializable_hash[:data][:attributes]
          })
        end

        def create
          @course = current_college.courses.new(course_params)
          
          if @course.save
            json_response(
              {
                message: 'Course created successfully',
                course: CourseSerializer.new(@course).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@course.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @course.update(course_params)
            json_response(
              {
                message: 'Course updated successfully',
                course: CourseSerializer.new(@course).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@course.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @course.destroy
          json_response(
            {
              message: 'Course deleted successfully'
            },
            :ok
          )
        end

        private

        def set_course
          @course = current_college.courses.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Course not found' }, :not_found)
        end

        def course_params
          params.require(:course).permit(:name, :code, :description, :credits, :department_id)
        end
        
        def filter_courses
          build_condition :search, operator: 'ilike', column: 'name'
          build_condition :search, operator: 'ilike', column: 'code'
          build_condition :department_id
        end
      end
    end
  end
end
