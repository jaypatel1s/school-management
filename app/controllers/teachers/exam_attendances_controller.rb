# frozen_string_literal: true

module Teachers
  class ExamAttendancesController < BaseController
    before_action :set_exam
    def edit; end

    def update
      if @exam.update(exam_attendance_params)
        flash[:success] = 'Exam attendance updated successfully.'
        redirect_to college_teachers_exams_path(@exam.slug)
      else
        flash.now[:alert] = @exam.errors.full_messages
        render :edit, status: :unprocessable_entity
      end
    end

    private

    def set_exam
      @exam = current_college.exams
                             .where(course_id: @profile.course_id)
                             .find_by(slug: params[:exam_slug]) # NOTE: :exam_id from route

      return if @exam.present?

      flash[:alert] = 'Exam not found or you are not authorized to manage it.'
      redirect_to college_teachers_exams_path(@exam.slug)
    end

    def exam_attendance_params
      params.require(:exam).permit(
        exam_attendances_attributes: %i[id status]
      )
    end
  end
end
