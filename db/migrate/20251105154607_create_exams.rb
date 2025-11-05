class CreateExams < ActiveRecord::Migration[7.1]
  def change
    create_table :exams do |t|
      t.references :college, null: false, foreign_key: true
      t.references :academic_year, null: false, foreign_key: true
      t.references :semester, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true
      t.string :name, null: false
      t.datetime :scheduled_at, null: false

      # CORRECTED: Changed 'limit: 100' to 'default: 100'
      t.integer :max_marks, default: 100

      # CORRECTED: Changed 'limit: 0' to 'default: 0'
      t.integer :exam_type, default: 0

      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end