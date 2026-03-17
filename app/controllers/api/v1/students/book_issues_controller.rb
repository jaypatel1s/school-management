# frozen_string_literal: true

module Api
  module V1
    module Students
      class BookIssuesController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_book_issues, only: %i[index]
        before_action :set_book_issue, only: %i[show]

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

        private

        def set_book_issue
          @book_issue = current_college.book_issues.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          json_response({ message: 'Book issue not found' }, :not_found)
        end

        def filter_book_issues
          # Students can only see their own book issues
          build_condition :student_id, value: current_user.student.id
          build_condition :search, operator: 'ilike', column: 'books.name'
        end
      end
    end
  end
end
