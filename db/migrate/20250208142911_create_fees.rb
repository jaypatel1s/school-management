class CreateFees < ActiveRecord::Migration[7.0]
  def change
    create_table :fees do |t|
      t.references :college, null: false, foreign_key: true
      t.references :department, foreign_key: true, null: false
      t.references :course, foreign_key: true, null: false
      t.string :name
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
