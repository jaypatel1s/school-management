# frozen_string_literal: true

module Api
  module V1
    module Principals
      class SemestersController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_semesters, only: %i[index]
        before_action :set_semester, only: %i[show update destroy]

        def index
          semesters = current_college.semesters.includes(:courses, :students).where(@conditions)
          @pagy, @semesters = pagy(semesters, items: @per_page, page: @page)
          json_response(
            semesters: SemesterSerializer.new(@semesters).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            semester: SemesterSerializer.new(@semester).serializable_hash[:data][:attributes]
          })
        end

        def create
          @semester = current_college.semesters.new(semester_params)
          
          if @semester.save
            json_response(
              {
                message: 'Semester created successfully',
                semester: SemesterSerializer.new(@semester).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@semester.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @semester.update(semester_params)
            json_response(
              {
                message: 'Semester updated successfully',
                semester: SemesterSerializer.new(@semester).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@semester.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @semester.destroy
          json_response(
            {
              message: 'Semester deleted successfully'
            },
            :ok
          )
        end

        private

        def set_semester
          @semester = current_college.semesters.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Semester not found' }, :not_found)
        end

        def semester_params
          params.require(:semester).permit(:name, :start_date, :end_date)
        end
        
        def filter_semesters
          build_condition :search, operator: 'ilike', column: 'name'
          build_condition :start_date
          build_condition :end_date
        end
      end
    end
  end
end
