# frozen_string_literal: true

module Principals
  # :nodoc:
  class CollegePaymentGatewaysController < BaseController
    before_action :set_college_payment_gateway, only: %i[show edit update destroy]

    def index
      @college_payment_gateways = current_college.college_payment_gateways
    end

    def show; end

    def new
      @college_payment_gateway = current_college.college_payment_gateways.new
    end

    def edit; end

    def create
      @college_payment_gateway = current_college.college_payment_gateways.new(college_payment_gateway_params)
      if @college_payment_gateway.save
        flash[:success] = 'Payment Gateway configured successfully'
        redirect_to college_principals_college_payment_gateways_path(current_college.slug)
      else
        flash[:alert] = @college_payment_gateway.errors.full_messages
        render :new
      end
    end

    def update
      if @college_payment_gateway.update(college_payment_gateway_params)
        flash[:success] = 'Payment Gateway Updated Successfully.'
        redirect_to college_principals_college_payment_gateways_path(current_college.slug)
      else
        flash[:alert] = @college_payment_gateway.errors.full_messages
        render :edit
      end
    end

    def destroy
      @college_payment_gateway.destroy
      flash[:success] = 'Payment Gateway Deleted Successfully'
      redirect_to college_principals_college_payment_gateways_path(current_college.slug)
    end

    private

    def set_college_payment_gateway
      @college_payment_gateway = current_college.college_payment_gateways.find_by(slug: params[:slug])
      return if @college_payment_gateway.present?

      flash[:notice] = 'Payment Gateway Not Found'
      redirect_to college_principals_college_payment_gateways_path(current_college.slug)
    end

    def college_payment_gateway_params
      params.require(:college_payment_gateway).permit(:name, :options, :active, :api_key, :api_secret,
                                                      :merchant_id, :active)
    end
  end
end
