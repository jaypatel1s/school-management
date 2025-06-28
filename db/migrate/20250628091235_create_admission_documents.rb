class CreateAdmissionDocuments < ActiveRecord::Migration[7.1]
  def change
    create_table :admission_documents do |t|
      t.references :admission, null: false, foreign_key: true
      t.references :document_type, null: false, foreign_key: true

      t.timestamps
    end
    add_index :admission_documents, [:admission_id, :document_type_id], unique: true, name: 'index_admission_documents_on_admission_and_document_type'
  end
end
