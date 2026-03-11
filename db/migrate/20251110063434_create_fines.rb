class CreateFines < ActiveRecord::Migration[7.1]
  def change
    create_table :fines do |t|
      t.references :college, null: false, foreign_key: true
      t.references :student, null: false, foreign_key: true
      t.references :book_issue, null: false, foreign_key: true
      t.decimal :amount, precision: 8, scale: 2, default: 0.0
      t.string :reason
      t.boolean :paid

      t.timestamps
    end
  end
end
