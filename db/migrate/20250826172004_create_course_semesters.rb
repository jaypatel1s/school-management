class CreateCourseSemesters < ActiveRecord::Migration[7.1]
  def change
    create_table :course_semesters do |t|
      t.references :course, null: false, foreign_key: true
      t.references :academic_year, null: false, foreign_key: true
      t.references :semester, null: false, foreign_key: true

      t.timestamps
    end
  end
end
