class AddAdmissionApplicationToStudents < ActiveRecord::Migration[7.1]
  def change
    add_reference :students, :admission_application, foreign_key: true
  end
end
