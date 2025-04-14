# frozen_string_literal: true

# :nodoc:
class CourseEnrollmentsController < BaseController
  before_action :set_course_enrollments, only: %i[show edit update destroy]

  def index
    @course_enrollments = current_college.course_enrollments
  end
end
