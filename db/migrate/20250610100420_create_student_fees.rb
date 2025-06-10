class CreateStudentFees < ActiveRecord::Migration[7.1]
  def change
    create_table :student_fees do |t|
      t.references :college, null: false, foreign_key: true
      t.references :student, null: false, foreign_key: true
      t.references :fee_structure, null: false, foreign_key: true
      t.string :status
      t.decimal :amount_paid
      t.date :due_date
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
