class CreateFeePayments < ActiveRecord::Migration[7.1]
  def change
    create_table :fee_payments do |t|
      t.references :college, null: false, foreign_key: true
      t.references :student_fee, null: false, foreign_key: true
      t.decimal :amount
      t.date :payment_date
      t.string :payment_method
      t.string :transaction_reference
      t.text :notes
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
