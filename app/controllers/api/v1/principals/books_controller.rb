# frozen_string_literal: true

module Api
  module V1
    module Principals
      class BooksController < BaseController
        before_action :set_paginate, only: %i[index]
        before_action :filter_books, only: %i[index]
        before_action :set_book, only: %i[show update destroy]

        def index
          books = current_college.books.left_joins(:book_issues).includes(:book_issues).distinct.where(@conditions)
          @pagy, @books = pagy(books, items: @per_page, page: @page)
          json_response(
            books: BookSerializer.new(@books).serializable_hash[:data].map { |s| s[:attributes] },
            pagy: paginate_json(@pagy)
          )
        end

        def show
          json_response({
            book: BookSerializer.new(@book).serializable_hash[:data][:attributes]
          })
        end

        def create
          @book = current_college.books.new(book_params)

          if @book.save
            json_response(
              {
                message: 'Book created successfully',
                book: BookSerializer.new(@book).serializable_hash[:data][:attributes]
              },
              :created
            )
          else
            json_response({ validation: format_validation_errors(@book.errors) }, :unprocessable_entity)
          end
        end

        def update
          if @book.update(book_params)
            json_response(
              {
                message: 'Book updated successfully',
                book: BookSerializer.new(@book).serializable_hash[:data][:attributes]
              }
            )
          else
            json_response({ validation: format_validation_errors(@book.errors) }, :unprocessable_entity)
          end
        end

        def destroy
          @book.destroy
          json_response(
            {
              message: 'Book deleted successfully'
            },
            :ok
          )
        end

        private

        def set_book
          @book = current_college.books.find_by(slug: params[:slug])
          return if @book.present?

          json_response({ message: 'Book not found' }, :not_found)
        end

        def book_params
          params.require(:book).permit(:name, :author, :isbn, :category, :total_copies, :published_year)
        end

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
