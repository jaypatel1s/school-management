class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.references :college, null: false, foreign_key: true
      t.references :department, foreign_key: true, null: false
      t.string :name
      t.text :description
      t.integer :credits
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
