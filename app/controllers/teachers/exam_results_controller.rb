# frozen_string_literal: true

module Teachers
  # Manages the recording and updating of student scores for a specific exam.
  class ExamResultsController < BaseController
    before_action :set_exam
    before_action :set_exam_result, only: %i[edit update]

    def index
      @students = @exam.course.students.includes(:user)

      @existing_results = @exam.exam_results.index_by(&:student_id)
    end

    def new
      @results = []

      scored_student_ids = @exam.exam_results.pluck(:student_id)
      unscored_students = @exam.course.students.where.not(id: scored_student_ids)

      unscored_students.each do |student|
        @results << @exam.exam_results.new(
          student: student,
          college: current_college,
          evaluated_by_teacher_id: @profile.id
        )
      end

      return unless @results.empty?

      flash[:notice] = 'All students have scores recorded for this exam.'
      redirect_to teachers_exam_exam_results_path(@exam.slug) and return
    end

    def edit; end

    def create
      results = []
      result_params.each do |result_data|
        next if result_data[:marks_obtained].blank?

        results << @exam.exam_results.new(
          result_data.merge(
            college: current_college,
            evaluated_by_teacher_id: @profile.id
          )
        )
      end

      if ExamResult.import(results, on_duplicate_key_ignore: true)
        flash[:success] = 'Scores recorded successfully.'
        redirect_to teachers_exam_exam_results_path(@exam.slug)
      else
        flash[:alert] = 'Error recording scores. Please check data and try again.'
        redirect_to new_teachers_exam_exam_result_path(@exam.slug)
      end
    end

    def update
      if @exam_result.update(exam_result_params.except(:student_id, :exam_id))
        flash[:success] = 'Score updated successfully.'
        redirect_to teachers_exam_exam_results_path(@exam.slug)
      else
        flash.now[:alert] = @exam_result.errors.full_messages
        render :edit, status: :unprocessable_entity
      end
    end

    private

    def set_exam
      course_id = @profile.course_id

      @exam = current_college.exams
                             .where(course_id: course_id)
                             .find_by!(slug: params[:exam_id])
      return if @exam.present?

      redirect_to teachers_exams_path, alert: 'Exam not found or you are not authorized to manage results for it.'
    end

    def set_exam_result
      @exam_result = @exam.exam_results.find_by(slug: params[:slug])
    end

    def result_params
      params.require(:results).map do |p|
        p.permit(:student_id, :marks_obtained).merge(exam_id: @exam.id)
      end
    end

    def exam_result_params
      params.require(:exam_result).permit(
        :student_id,
        :marks_obtained,
        :grade,
        :passed
      )
    end
  end
end
