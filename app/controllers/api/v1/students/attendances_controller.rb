# frozen_string_literal: true

module Api
  module V1
    module Students
      class AttendancesController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_attendances, only: %i[index]
        before_action :set_attendance, only: %i[show]

        def index
          attendances = current_user.student.attendances.includes(:session).where(@conditions)
          @pagy, @attendances = pagy(attendances, items: @per_page, page: @page)
          json_response(
            attendances: AttendanceSerializer.new(@attendances).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            attendance: AttendanceSerializer.new(@attendance).serializable_hash[:data][:attributes]
          })
        end

        def report
          attendances = current_user.student.attendances.where(date: params[:date] || Date.current)
          present_count = CountSerializer.where_count(attendances, present: true)
          absent_count = CountSerializer.where_count(attendances, present: false)
          total_count = CountSerializer.new(attendances)
          
          json_response({
            date: params[:date] || Date.current,
            total_classes: total_count,
            present: present_count,
            absent: absent_count,
            attendance_rate: total_count > 0 ? (present_count.to_f / total_count * 100).round(2) : 0
          })
        end

        private

        def set_attendance
          @attendance = current_user.student.attendances.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Attendance not found' }, :not_found)
        end
        
        def filter_attendances
          build_condition :session_id
          build_condition :date
          build_condition :present
        end
      end
    end
  end
end
