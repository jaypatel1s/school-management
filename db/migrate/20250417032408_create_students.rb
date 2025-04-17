class CreateStudents < ActiveRecord::Migration[7.1]
  def change
    create_table :students do |t|
      t.references :college, null: false, foreign_key: true
      t.integer :status
      t.integer :roll_number
      t.integer :mobile_no

      t.timestamps
    end
  end
end
