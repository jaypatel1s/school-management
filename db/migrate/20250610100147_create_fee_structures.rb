class CreateFeeStructures < ActiveRecord::Migration[7.1]
  def change
    drop_table :fees, if_exists: true
    drop_table :fee_types, if_exists: true
    drop_table :fee_structures, if_exists: true

    create_table :fee_structures do |t|
      t.references :college, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.decimal :total_amount
      t.references :academic_year, null: false, foreign_key: true
      t.references :department, null: false, foreign_key: true
      t.references :created_by, null: false, foreign_key: { to_table: :users }
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
