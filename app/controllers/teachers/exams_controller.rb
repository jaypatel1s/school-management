# frozen_string_literal: true

module Teachers
  # :nodoc:
  class ExamsController < BaseController
    before_action :set_exam, only: %i[show edit update destroy]

    # GET /teachers/exams
    def index
      @exams = current_college.exams
                              .where(course_id: @profile.course_id)
                              .includes(:course)
                              .order(scheduled_at: :desc)
    end

    def show; end

    def new
      @exam = current_college.exams.new
      @academic_years = current_college.academic_years.order(:start_date)
      @semesters = current_college.semesters
    end

    def edit
      @academic_years = current_college.academic_years.order(:start_date)
      @semesters = current_college.semesters
    end

    def create
      @exam = current_college.exams.new(exam_params)
      @exam.course_id = @profile.course_id
      if @exam.save
        flash[:success] = 'Exam was successfully scheduled.'
        redirect_to college_teachers_exams_path
      else
        flash.now[:alert] = @exam.errors.full_messages
        render :new, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /teachers/exams/:slug
    def update
      if @exam.update(exam_params)
        flash[:success] = 'Exam was successfully updated.'
        redirect_to college_teachers_exams_path

      else
        flash.now[:alert] = @exam.errors.full_messages
        render :edit, status: :unprocessable_entity
      end
    end

    # DELETE /teachers/exams/:slug
    def destroy
      @exam.destroy
      flash[:success] = 'Exam was successfully deleted.'
      redirect_to redirect_to college_teachers_exams_path
    end

    private

    # Scopes the exam find operation to the current college AND the teacher's courses.
    def set_exam
      @exam = current_college.exams
                             .where(course_id: @profile.course_id)
                             .find_by(slug: params[:slug])

      return if @exam.present?

      flash[:notice] = 'Exam Not Found or not associated with your courses.'
      redirect_to college_teachers_exams_path
    end

    def exam_params
      params.require(:exam).permit(
        :name, :scheduled_at, :max_marks, :exam_type,
        :academic_year_id, :semester_id, :course_id
      )
    end
  end
end
