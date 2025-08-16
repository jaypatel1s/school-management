class AddReferenceToAdmissionDocument < ActiveRecord::Migration[7.1]
  def change
    add_reference :admission_documents, :admission_application, null: false, foreign_key: true
  end
end
