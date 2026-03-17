# frozen_string_literal: true

module Api
  module V1
    module Principals
      class AdmissionsController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_admissions, only: %i[index]
        before_action :set_admission, only: %i[show update destroy]

        def index
          admissions = current_college.admissions.includes(:course).where(@conditions)
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
          @admission = current_college.admissions.new(admission_params)
          
          if @admission.save
            json_response(
              {
                message: 'Admission created successfully',
                admission: AdmissionSerializer.new(@admission).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@admission.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @admission.update(admission_params)
            json_response(
              {
                message: 'Admission updated successfully',
                admission: AdmissionSerializer.new(@admission).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@admission.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @admission.destroy
          json_response(
            {
              message: 'Admission deleted successfully'
            },
            :ok
          )
        end

        def approve
          if @admission.update(status: 'approved')
            json_response({
              message: 'Admission approved successfully',
              admission: AdmissionSerializer.new(@admission).serializable_hash[:data][:attributes]
            })
          else
            json_response({ validation: format_validation_errors(@admission.errors) }, :unprocessable_entity)
          end
        end

        def reject
          if @admission.update(status: 'rejected')
            json_response({
              message: 'Admission rejected successfully',
              admission: AdmissionSerializer.new(@admission).serializable_hash[:data][:attributes]
            })
          else
            json_response({ validation: format_validation_errors(@admission.errors) }, :unprocessable_entity)
          end
        end

        private

        def set_admission
          @admission = current_college.admissions.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Admission not found' }, :not_found)
        end

        def admission_params
          params.require(:admission).permit(:student_name, :email, :phone, :course_id, :status)
        end
        
        def filter_admissions
          build_condition :course_id
          build_condition :status
          build_condition :search, operator: 'ilike', column: 'student_name'
          build_condition :search, operator: 'ilike', column: 'email'
        end
      end
    end
  end
end
