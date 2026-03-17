# frozen_string_literal: true

module Api
  module V1
    module SuperAdmins
      class UsersController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_users, only: %i[index]
        before_action :set_user, only: %i[show update destroy]

        def index
          users = User.includes(:college, :student, :teacher).where(@conditions)
          @pagy, @users = pagy(users, items: @per_page, page: @page)
          json_response(
            users: UserSerializer.new(@users).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            user: UserSerializer.new(@user).serializable_hash[:data][:attributes]
          })
        end

        def create
          @user = User.new(user_params)
          
          if @user.save
            json_response(
              {
                message: 'User created successfully',
                user: UserSerializer.new(@user).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@user.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @user.update(user_params)
            json_response(
              {
                message: 'User updated successfully',
                user: UserSerializer.new(@user).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@user.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @user.destroy
          json_response(
            {
              message: 'User deleted successfully'
            },
            :ok
          )
        end

        private

        def set_user
          @user = User.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'User not found' }, :not_found)
        end

        def user_params
          params.require(:user).permit(:email, :password, :password_confirmation, :role, :college_id, :first_name, :last_name)
        end
        
        def filter_users
          build_condition :role
          build_condition :college_id
          build_condition :search, operator: 'ilike', column: 'email'
          build_condition :search, operator: 'ilike', column: 'first_name'
          build_condition :search, operator: 'ilike', column: 'last_name'
        end
      end
    end
  end
end
