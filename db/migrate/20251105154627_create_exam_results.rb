class CreateExamResults < ActiveRecord::Migration[7.1]
  def change
    create_table :exam_results do |t|
      t.references :college, null: false, foreign_key: true
      t.references :exam, null: false, foreign_key: true
      t.references :student, null: false, foreign_key: true
      t.integer :marks_obtained
      t.string :grade
      t.boolean :passed, default: false
      t.references :evaluated_by_teacher, null: false, foreign_key: { to_table: :teachers }

      t.timestamps
    end
    add_index :exam_results, [:exam_id, :student_id], unique: true
  end
end
