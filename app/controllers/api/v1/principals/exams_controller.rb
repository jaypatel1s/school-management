# frozen_string_literal: true

module Api
  module V1
    module Principals
      class ExamsController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_exams, only: %i[index]
        before_action :set_exam, only: %i[show update destroy]

        def index
          exams = current_college.exams.includes(:course, :results).where(@conditions)
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

        def create
          @exam = current_college.exams.new(exam_params)
          
          if @exam.save
            json_response(
              {
                message: 'Exam created successfully',
                exam: ExamSerializer.new(@exam).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@exam.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @exam.update(exam_params)
            json_response(
              {
                message: 'Exam updated successfully',
                exam: ExamSerializer.new(@exam).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@exam.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @exam.destroy
          json_response(
            {
              message: 'Exam deleted successfully'
            },
            :ok
          )
        end

        private

        def set_exam
          @exam = current_college.exams.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Exam not found' }, :not_found)
        end

        def exam_params
          params.require(:exam).permit(:title, :description, :exam_date, :total_marks, :passing_marks, :course_id)
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
