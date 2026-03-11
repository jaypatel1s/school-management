# frozen_string_literal: true

class CreateCourseTeachers < ActiveRecord::Migration[7.1]
  def change
    create_table :course_teachers do |t|
      t.references :course, null: false, foreign_key: true
      t.references :teacher, null: false, foreign_key: true
      t.timestamps
    end
    
    add_index :course_teachers, [:course_id, :teacher_id], unique: true
  end
end
