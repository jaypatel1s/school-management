class CreateFeeComponents < ActiveRecord::Migration[7.1]
  def change
    create_table :fee_components do |t|
      t.references :college, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.decimal :amount
      t.references :fee_structure, null: false, foreign_key: true
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
