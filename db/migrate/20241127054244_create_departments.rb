class CreateDepartments < ActiveRecord::Migration[7.0]
  def change
    create_table :departments do |t|
      t.references :college, null: false, foreign_key: true
      t.references :head, foreign_key: { to_table: :users }, null: false
      t.string :name
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
