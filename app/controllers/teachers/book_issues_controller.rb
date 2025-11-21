# frozen_string_literal: true

# :nodoc:
module Teachers
  class BooksController < BaseController
    before_action :set_book, only: %i[indexshow edit update destroy issue]

    def index
      @book_issues = @book.book_issues
    end

    def show
    end

    def new
      @book_issue = @book.book_issues.new
    end

    def create
      @book_issue = @book.book_issues.new(book_params)
      @book_issue.college_id = current_college.id
      if @book.save
        redirect_to college_teachers_books_path, notice: 'Book Issue successfully created.'
      else
        render :new
      end
    end

    def edit
    end

    def update
      if @book.update(book_params)
        redirect_to college_teachers_books_path, notice: 'Book Issue successfully updated.'
      else
        render :edit
      end
    end

    def destroy
      @book.destroy
      redirect_to college_teachers_books_path, notice: 'Book Issue deleted.'
    end

    # POST /books/:id/issue
    def issue
      student = Student.find(params[:student_id])
      if @book.available?
        issue = @book.issue_to(student)
        redirect_to @book, notice: "Book issued to #{student.name}, due on #{issue.due_date}."
      else
        redirect_to @book, alert: 'No copies available to issue.'
      end
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
