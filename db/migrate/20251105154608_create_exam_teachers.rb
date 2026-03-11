# frozen_string_literal: true

class CreateExamTeachers < ActiveRecord::Migration[7.1]
  def change
    create_table :exam_teachers do |t|
      t.references :exam, null: false, foreign_key: true
      t.references :teacher, null: false, foreign_key: true
      t.string :role, default: 'invigilator'
      
      t.timestamps
    end
    
    add_index :exam_teachers, [:exam_id, :teacher_id], unique: true
  end
end
