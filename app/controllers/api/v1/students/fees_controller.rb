# frozen_string_literal: true

module Api
  module V1
    module Students
      class FeesController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_fees, only: %i[index]
        before_action :set_fee, only: %i[show]

        def index
          fees = current_user.student.student_fees.where(@conditions)
          @pagy, @fees = pagy(fees, items: @per_page, page: @page)
          json_response(
            fees: FeeSerializer.new(@fees).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            fee: FeeSerializer.new(@fee).serializable_hash[:data][:attributes]
          })
        end

        def summary
          total_fees = CountSerializer.new(current_user.student.student_fees)
          paid_fees = CountSerializer.where_count(current_user.student.student_fees, status: 'paid')
          pending_fees = CountSerializer.where_count(current_user.student.student_fees, status: 'pending')
          total_amount = current_user.student.student_fees.sum(:amount)
          paid_amount = current_user.student.student_fees.where(status: 'paid').sum(:amount)
          pending_amount = total_amount - paid_amount
          
          json_response({
            total_fees: total_fees,
            paid_fees: paid_fees,
            pending_fees: pending_fees,
            total_amount: total_amount,
            paid_amount: paid_amount,
            pending_amount: pending_amount
          })
        end

        private

        def set_fee
          @fee = current_user.student.student_fees.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Fee not found' }, :not_found)
        end
        
        def filter_fees
          build_condition :status
          build_condition :due_date
        end
      end
    end
  end
end
