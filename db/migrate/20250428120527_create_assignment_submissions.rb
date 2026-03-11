# frozen_string_literal: true

class CreateAssignmentSubmissions < ActiveRecord::Migration[7.1]
  def change
    create_table :assignment_submissions do |t|
      t.references :assignment, null: false, foreign_key: true
      t.references :student, null: false, foreign_key: true
      t.text :comments
      t.decimal :grade, precision: 5, scale: 2
      t.text :feedback
      t.datetime :submitted_at
      t.datetime :graded_at
      t.string :status, default: 'submitted'

      t.timestamps
    end

    add_index :assignment_submissions, [:assignment_id, :student_id], unique: true
  end
end
