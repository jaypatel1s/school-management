# frozen_string_literal: true

module Api
  module V1
    module Public
      class AdmissionsController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_admissions, only: %i[index]
        before_action :set_admission, only: %i[show]

        def index
          admissions = Admission.where(@conditions)
          @pagy, @admissions = pagy(admissions, items: @per_page, page: @page)
          json_response(
            admissions: AdmissionSerializer.new(@admissions).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            admission: AdmissionSerializer.new(@admission).serializable_hash[:data][:attributes]
          })
        end

        def create
          @admission = Admission.new(admission_params)
          
          if @admission.save
            json_response(
              {
                message: 'Admission application submitted successfully',
                admission: AdmissionSerializer.new(@admission).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@admission.errors) }, :unprocessable_entity)
          end
        end

        private

        def set_admission
          @admission = Admission.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Admission not found' }, :not_found)
        end

        def admission_params
          params.require(:admission).permit(:student_name, :email, :phone, :college_id, :course_id)
        end
        
        def filter_admissions
          build_condition :college_id
          build_condition :course_id
          build_condition :status
          build_condition :search, operator: 'ilike', column: 'student_name'
        end
      end
    end
  end
end
