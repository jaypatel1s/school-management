# frozen_string_literal: true

module Api
  module V1
    module SuperAdmins
      class CollegesController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_colleges, only: %i[index]
        before_action :set_college, only: %i[show update destroy]

        def index
          colleges = College.includes(:users, :students, :teachers).where(@conditions)
          @pagy, @colleges = pagy(colleges, items: @per_page, page: @page)
          json_response(
            colleges: CollegeSerializer.new(@colleges).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            college: CollegeSerializer.new(@college).serializable_hash[:data][:attributes]
          })
        end

        def create
          @college = College.new(college_params)
          
          if @college.save
            json_response(
              {
                message: 'College created successfully',
                college: CollegeSerializer.new(@college).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@college.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @college.update(college_params)
            json_response(
              {
                message: 'College updated successfully',
                college: CollegeSerializer.new(@college).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@college.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @college.destroy
          json_response(
            {
              message: 'College deleted successfully'
            },
            :ok
          )
        end

        private

        def set_college
          @college = College.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'College not found' }, :not_found)
        end

        def college_params
          params.require(:college).permit(:name, :slug)
        end
        
        def filter_colleges
          build_condition :search, operator: 'ilike', column: 'name'
          build_condition :search, operator: 'ilike', column: 'slug'
        end
      end
    end
  end
end
