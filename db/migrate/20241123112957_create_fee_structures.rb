class CreateFeeStructures < ActiveRecord::Migration[7.0]
  def change
    create_table :fee_structures do |t|
      t.string :name
      t.references :college, null: false, foreign_key: true
      t.references :classroom, null: false, foreign_key: true
      t.decimal :tuition_fee
      t.decimal :other_expense
      t.decimal :total_fee
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
