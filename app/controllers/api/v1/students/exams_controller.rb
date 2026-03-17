# frozen_string_literal: true

module Api
  module V1
    module Students
      class ExamsController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_exams, only: %i[index]
        before_action :set_exam, only: %i[show]

        def index
          exams = current_college.exams.joins(:course).where(courses: { id: current_user.student.course_ids }).includes(:course, :results).where(@conditions)
          @pagy, @exams = pagy(exams, items: @per_page, page: @page)
          json_response(
            exams: ExamSerializer.new(@exams).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            exam: ExamSerializer.new(@exam).serializable_hash[:data][:attributes]
          })
        end

        private

        def set_exam
          @exam = current_college.exams.joins(:course).where(courses: { id: current_user.student.course_ids }).find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Exam not found' }, :not_found)
        end
        
        def filter_exams
          build_condition :course_id
          build_condition :search, operator: 'ilike', column: 'title'
          build_condition :exam_date
        end
      end
    end
  end
end
