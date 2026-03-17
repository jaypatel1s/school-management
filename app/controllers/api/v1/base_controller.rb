# frozen_string_literal: true

module Api
  module V1
    class BaseController < ApplicationController
      before_action :set_current_college, unless: -> { current_user&.super_admin? }

      attr_reader :current_college

      private

      def set_current_college
        @current_college = if params[:college_slug] == current_user.college.slug
                             College.find_by(slug: params[:college_slug])
                           elsif params[:session_slug] == current_user.college.slug
                             College.find_by(slug: params[:session_slug])
                           else
                             current_user.college
                           end
        return if @current_college.present?

        json_response({ error: 'College not match with current user' }, :forbidden)
      end
    end
  end
end
