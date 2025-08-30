class RemoveSlugFromStudentFee < ActiveRecord::Migration[7.1]
  def change
    remove_column :student_fees, :slug, :string
    remove_column :fee_payments, :slug, :string
  end
end
