class CreateAdmissionReceipts < ActiveRecord::Migration[7.1]
  def change
    create_table :admission_receipts do |t|
      t.references :student_fee, null: false, foreign_key: true
      t.references :admission_payment, null: false, foreign_key: true
      t.string :receipt_number, null: false
      t.string :pdf_url
      t.timestamps
    end
  end
end
