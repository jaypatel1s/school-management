# frozen_string_literal: true

module Api
  module V1
    module Teachers
      class StudentsController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_students, only: %i[index]
        before_action :set_student, only: %i[show]

        def index
          students = Student.joins(:courses).where(courses: { teacher_id: current_user.teacher.id }).includes(:user, :courses).where(@conditions)
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

        private

        def set_student
          @student = Student.joins(:courses).where(courses: { teacher_id: current_user.teacher.id }).find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Student not found' }, :not_found)
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
