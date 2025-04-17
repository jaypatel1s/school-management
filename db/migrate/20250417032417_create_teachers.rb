class CreateTeachers < ActiveRecord::Migration[7.1]
  def change
    create_table :teachers do |t|
      t.references :college, null: false, foreign_key: true
      t.references :department, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true
      t.string :specialization

      t.timestamps
    end
  end
end
