class AddDetailsToAdmissionPayments < ActiveRecord::Migration[7.1]
  def change
    add_reference :admission_applications, :fee_structure, null: true, foreign_key: true
    add_column :admission_payments, :amount, :decimal, precision: 10, scale: 2, null: false, default: 0
    add_column :admission_payments, :payment_mode, :integer, default: 0, null: false
    add_column :admission_applications, :documents_verified, :boolean, default: false, null: false
    add_column :admission_documents, :verified, :boolean, default: false, null: false
  end
end
