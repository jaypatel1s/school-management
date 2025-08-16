class AddAdmissionApplicationToStudentFees < ActiveRecord::Migration[7.1]
  def change
    add_reference :student_fees, :admission_application, null: false, foreign_key: true
  end
end
