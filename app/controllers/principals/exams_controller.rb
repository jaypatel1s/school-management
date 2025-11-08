# frozen_string_literal: true

module Principals
  # :nodoc:
  class ExamsController < BaseController
    before_action :set_exam, only: %i[show]

    # GET /principals/exams
    def index
      # Scope: All exams in the current college.
      @exams = current_college.exams
                              .includes(:course, :academic_year, :semester)
                              .order(scheduled_at: :desc)
    end

    # GET /principals/exams/:slug
    def show; end

    private

    # Scopes the exam find operation to the current college.
    def set_exam
      @exam = current_college.exams.find_by(slug: params[:slug])
      return if @exam.present?

      flash[:notice] = 'Exam Not Found'
      redirect_to college_principals_exams_path(current_college.slug)
    end
  end
end
