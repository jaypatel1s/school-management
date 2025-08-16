class CreateAdmissionPayments < ActiveRecord::Migration[7.1]
  def change
    create_table :admission_payments do |t|
      t.references :admission_application, null: false, foreign_key: true
      t.string :transaction_id
      t.string :payment_status
      t.datetime :paid_at
      t.timestamps
    end
  end
end
