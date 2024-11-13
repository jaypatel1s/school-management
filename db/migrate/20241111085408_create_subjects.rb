class CreateSubjects < ActiveRecord::Migration[7.0]
  def change
    create_table :subjects do |t|
      t.references :college, null: false, foreign_key: true
      t.string :name
      t.string :description
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
