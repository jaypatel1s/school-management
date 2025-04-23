# frozen_string_literal: true

# :nodoc:
module Teachers
  class DepartmentsController < BaseController
    before_action :set_department, only: %i[show]

    def index
      @department = @profile.department
    end

    def show; end
  end
end
