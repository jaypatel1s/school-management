# frozen_string_literal: true

module Api
  module V1
    module Principals
      class FeesController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_fees, only: %i[index]
        before_action :set_fee, only: %i[show update destroy]

        def index
          fees = current_college.student_fees.includes(:student).where(@conditions)
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

        def create
          @fee = current_college.student_fees.new(fee_params)
          
          if @fee.save
            json_response(
              {
                message: 'Fee created successfully',
                fee: FeeSerializer.new(@fee).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@fee.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @fee.update(fee_params)
            json_response(
              {
                message: 'Fee updated successfully',
                fee: FeeSerializer.new(@fee).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@fee.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @fee.destroy
          json_response(
            {
              message: 'Fee deleted successfully'
            },
            :ok
          )
        end

        def collection_report
          fees = current_college.student_fees.where(status: 'paid')
          total_collected = fees.sum(:amount)
          
          json_response({
            total_collected: total_collected,
            fees_count: CountSerializer.new(fees),
            collection_date: params[:date] || Date.current
          })
        end

        private

        def set_fee
          @fee = current_college.student_fees.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Fee not found' }, :not_found)
        end

        def fee_params
          params.require(:fee).permit(:student_id, :amount, :due_date, :status)
        end
        
        def filter_fees
          build_condition :student_id
          build_condition :status
          build_condition :due_date
          build_condition :search, operator: 'ilike', column: 'students.name'
        end
      end
    end
  end
end
