# frozen_string_literal: true

module Api
  module V1
    module Public
      class CollegesController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_colleges, only: %i[index]
        before_action :set_college, only: %i[show]

        def index
          colleges = College.where(@conditions)
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

        private

        def set_college
          @college = College.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'College not found' }, :not_found)
        end
        
        def filter_colleges
          build_condition :search, operator: 'ilike', column: 'name'
          build_condition :search, operator: 'ilike', column: 'slug'
        end
      end
    end
  end
end
