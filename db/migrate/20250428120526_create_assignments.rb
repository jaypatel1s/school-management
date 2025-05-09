class CreateAssignments < ActiveRecord::Migration[7.1]
  def change
    create_table :assignments do |t|
      t.references :teacher, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true
      t.references :department, null: false, foreign_key: true
      t.references :college, null: false, foreign_key: true
      t.string :slug, limit: 255, null: false
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
