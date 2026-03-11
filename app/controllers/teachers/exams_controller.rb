# frozen_string_literal: true

module Teachers
  # :nodoc:
  class ExamsController < BaseController
    before_action :set_exam, only: %i[show edit update destroy]

    # GET /teachers/exams
    def index
      @exams = current_college.exams
                              .joins(:exam_teachers)
                              .where(exam_teachers: { teacher_id: @profile.id })
                              .includes(:course)
                              .order(scheduled_at: :desc)
    end

    def show; end

    def new
      @exam = current_college.exams.new
      @academic_years = current_college.academic_years.order(:start_date)
      @semesters = current_college.semesters
      @courses = @profile.courses
    end

    def edit
      @academic_years = current_college.academic_years.order(:start_date)
      @semesters = current_college.semesters
      @courses = @profile.courses
    end

    def create
      @exam = current_college.exams.new(exam_params)
      if @exam.save
        # Assign current teacher to the exam
        @exam.exam_teachers.create(teacher: @profile, role: 'coordinator')
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
      redirect_to college_teachers_exams_path
    end

    private

    # Scopes the exam find operation to the current college AND teacher's assigned exams
    def set_exam
      @exam = current_college.exams
                             .joins(:exam_teachers)
                             .where(exam_teachers: { teacher_id: @profile.id })
                             .find_by(slug: params[:slug])

      return if @exam.present?

      flash[:notice] = 'Exam Not Found or not assigned to you.'
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
