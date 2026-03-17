# frozen_string_literal: true

module Api
  module V1
    module Principals
      class BookIssuesController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_book_issues, only: %i[index]
        before_action :set_book_issue, only: %i[show update destroy]

        def index
          book_issues = current_college.book_issues.includes(:book, :student, :fine).where(@conditions)
          @pagy, @book_issues = pagy(book_issues, items: @per_page, page: @page)
          json_response(
            book_issues: BookIssueSerializer.new(@book_issues).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            book_issue: BookIssueSerializer.new(@book_issue).serializable_hash[:data][:attributes]
          })
        end

        def create
          @book_issue = current_college.book_issues.new(book_issue_params)

          if @book_issue.save
            # Update available copies
            @book_issue.book.decrement!(:available_copies)
            json_response(
              {
                message: 'Book issued successfully',
                book_issue: BookIssueSerializer.new(@book_issue).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@book_issue.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @book_issue.update(book_issue_params)
            json_response(
              {
                message: 'Book issue updated successfully',
                book_issue: BookIssueSerializer.new(@book_issue).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@book_issue.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @book_issue.destroy
          json_response(
            {
              message: 'Book issue deleted successfully'
            },
            :ok
          )
        end

        def return_book
          if @book_issue.update(return_date: Date.current)
            @book_issue.book.increment!(:available_copies)
            json_response(
              {
                message: 'Book returned successfully',
                book_issue: BookIssueSerializer.new(@book_issue).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@book_issue.errors) }, :unprocessable_entity)
          end
        end

        def renew
          if @book_issue.renew(params[:extra_days] || 7)
            json_response(
              {
                message: 'Book renewed successfully',
                book_issue: BookIssueSerializer.new(@book_issue).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ error: 'Failed to renew book' }, :unprocessable_entity)
          end
        end

        private

        def set_book_issue
          @book_issue = current_college.book_issues.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Book issue not found' }, :not_found)
        end

        def book_issue_params
          params.require(:book_issue).permit(:book_id, :student_id, :issue_date, :due_date)
        end

        def filter_book_issues
          build_condition :book_id
          build_condition :student_id
          build_condition :return_date, operator: 'is', value: nil
          build_condition :search, operator: 'ilike', column: 'books.name'
          build_condition :search, operator: 'ilike', column: 'students.name'
        end
      end
    end
  end
end
