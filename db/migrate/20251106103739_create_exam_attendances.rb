# db/migrate/20251106203000_create_exam_attendances.rb
class CreateExamAttendances < ActiveRecord::Migration[7.1]
  def change
    create_table :exam_attendances do |t|
      t.references :exam, null: false, foreign_key: true
      t.references :student, null: false, foreign_key: true
      t.integer :status, default: 0, null: false

      t.timestamps
    end

    add_index :exam_attendances, [:exam_id, :student_id], unique: true
  end
end
