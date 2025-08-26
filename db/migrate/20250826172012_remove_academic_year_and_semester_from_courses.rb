class RemoveAcademicYearAndSemesterFromCourses < ActiveRecord::Migration[7.1]
  def change
    remove_reference :courses, :academic_year, foreign_key: true
    remove_reference :courses, :semester, foreign_key: true
  end
end
