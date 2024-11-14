class CreateClassrooms < ActiveRecord::Migration[7.0]
  def change
    create_table :classrooms do |t|
      t.references :college, null: false, foreign_key: true
      t.string :name
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
