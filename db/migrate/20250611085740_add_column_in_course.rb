class AddColumnInCourse < ActiveRecord::Migration[7.1]
  def change
    add_reference :courses, :semester, foreign_key: true, null: false
    add_reference :courses, :academic_year, foreign_key: true, null: false
    remove_reference :academic_years, :department
  end
end
