class AddColumnInCourse < ActiveRecord::Migration[7.1]
  def change
    remove_reference :courses, :department
    add_reference :courses, :semester, foreign_key: true, null: false
  end
end
