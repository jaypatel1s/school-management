class CreateFeeTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :fee_types do |t|
      t.references :college, null: false, foreign_key: true
      t.string :name
      t.string :slug, limit: 255, null: false

      t.timestamps
    end

    add_reference :fees, :fee_type, null: false, foreign_key: true
  end
end
