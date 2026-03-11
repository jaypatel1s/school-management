# frozen_string_literal: true

# :nodoc:
module Teachers
  class BooksController < BaseController
    before_action :set_book, only: %i[show edit update destroy issue]

    def index
      @books = current_college.books.order(:name)
    end

    def show
    end

    def new
      @book = current_college.books.new
    end

    def create
      @book = current_college.books.new(book_params)
      if @book.save
        redirect_to college_teachers_books_path, notice: 'Book was successfully created.'
      else
        render :new
      end
    end

    def edit
    end

    def update
      if @book.update(book_params)
        redirect_to college_teachers_books_path, notice: 'Book was successfully updated.'
      else
        render :edit
      end
    end

    def destroy
      @book.destroy
      redirect_to college_teachers_books_path, notice: 'Book was deleted.'
    end

    private

    def set_book
      @book = current_college.books.find_by(slug: params[:slug])
    end

    def book_params
      params.require(:book).permit(:name, :author, :isbn, :category, :quantity, :total_copies, :available_copies, :published_year)
    end
  end
end
