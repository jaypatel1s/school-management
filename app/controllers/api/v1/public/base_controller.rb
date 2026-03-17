# frozen_string_literal: true

module Api
  module V1
    module Public
      class BaseController < ActionController::API
        include Response
        skip_before_action :doorkeeper_authorize!
        
        private
        
        def set_paginate
          per_page = params['per_page'].to_i
          @per_page = per_page.positive? && per_page <= MAX_PER_PAGE ? per_page : MIN_PER_PAGE

          page = params['page'].to_i
          @page = page.positive? ? page : MIN_START_PAGE
        end
      end
    end
  end
end
