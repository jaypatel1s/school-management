class CreateSemesters < ActiveRecord::Migration[7.1]
  def change
    create_table :semesters do |t|
      t.references :academic_year, null: false, foreign_key: true
      t.references :college, null: false, foreign_key: true
      t.string :name
      t.boolean :current, default: false
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
