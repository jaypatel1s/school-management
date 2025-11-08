# frozen_string_literal: true

# :nodoc:
module DataHelper
  def select_semesters
    current_college.semesters.map { |s| [s.name, s.id] }
  end

  def select_academic_years
    current_college.academic_years.order(:start_date).map { |ay| ["#{ay.start_date.year}-#{ay.end_date.year}", ay.id] }
  end
end
