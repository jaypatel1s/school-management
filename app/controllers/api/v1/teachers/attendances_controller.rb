# frozen_string_literal: true

module Api
  module V1
    module Teachers
      class AttendancesController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_attendances, only: %i[index]
        before_action :set_attendance, only: %i[show update destroy]

        def index
          attendances = current_college.attendances.joins(session: { course: :teacher }).where(courses: { teachers: { id: current_user.teacher.id } }).includes(:student, :session).where(@conditions)
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

        def create
          @attendance = current_college.attendances.new(attendance_params)
          
          if @attendance.save
            json_response(
              {
                message: 'Attendance marked successfully',
                attendance: AttendanceSerializer.new(@attendance).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@attendance.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @attendance.update(attendance_params)
            json_response(
              {
                message: 'Attendance updated successfully',
                attendance: AttendanceSerializer.new(@attendance).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@attendance.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @attendance.destroy
          json_response(
            {
              message: 'Attendance deleted successfully'
            },
            :ok
          )
        end

        def bulk_mark
          attendance_params[:attendances]&.each do |attendance_data|
            attendance = current_college.attendances.find_or_initialize_by(
              student_id: attendance_data[:student_id],
              session_id: attendance_data[:session_id],
              date: attendance_data[:date] || Date.current
            )
            attendance.update(present: attendance_data[:present])
          end
          
          json_response({
            message: 'Attendance marked successfully for all students'
          })
        end

        private

        def set_attendance
          @attendance = current_college.attendances.joins(session: { course: :teacher }).where(courses: { teachers: { id: current_user.teacher.id } }).find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Attendance not found' }, :not_found)
        end

        def attendance_params
          params.require(:attendance).permit(:student_id, :session_id, :date, :present, :notes, attendances: [:student_id, :session_id, :date, :present, :notes])
        end
        
        def filter_attendances
          build_condition :student_id
          build_condition :session_id
          build_condition :date
          build_condition :present
          build_condition :search, operator: 'ilike', column: 'students.name'
        end
      end
    end
  end
end
