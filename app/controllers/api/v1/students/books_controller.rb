# frozen_string_literal: true

module Api
  module V1
    module Students
      class BooksController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_books, only: %i[index]

        def index
          books = current_college.books.left_joins(:book_issues).includes(:book_issues).distinct.where(@conditions)
          @pagy, @books = pagy(books, items: @per_page, page: @page)
          json_response(
            books: BookSerializer.new(@books).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          book = current_college.books.find_by(slug: params[:slug])
          return json_response({ message: 'Book not found' }, :not_found) unless book

          json_response({
            book: BookSerializer.new(book).serializable_hash[:data][:attributes]
          })
        end

        private

        def filter_books
          build_condition :search, operator: 'ilike', column: 'name'
          build_condition :search, operator: 'ilike', column: 'author'
          build_condition :category
          build_condition :available_copies, operator: '>'
        end
      end
    end
  end
end
