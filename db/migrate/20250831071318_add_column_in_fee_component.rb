class AddColumnInFeeComponent < ActiveRecord::Migration[7.1]
  def change
    add_reference :fee_components, :semester, foreign_key: true, null: false
    add_reference :admission_payments, :semester, foreign_key: true, null: false
    add_reference :student_fees, :semester, foreign_key: true, null: false
    add_column :student_fees, :total_amount, :decimal, precision: 12, scale: 2, default: 0.0
  end
end
