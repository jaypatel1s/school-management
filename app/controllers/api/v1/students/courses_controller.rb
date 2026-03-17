# frozen_string_literal: true

module Api
  module V1
    module Students
      class CoursesController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_courses, only: %i[index]
        before_action :set_course, only: %i[show]

        def index
          courses = current_user.student.courses.includes(:department, :college).where(@conditions)
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

        private

        def set_course
          @course = current_user.student.courses.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Course not found' }, :not_found)
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
