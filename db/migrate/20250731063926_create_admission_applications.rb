class CreateAdmissionApplications < ActiveRecord::Migration[7.1]
  def change
    create_table :admission_applications do |t|
      t.references :admission, null: false, foreign_key: true
      t.references :college, null: false, foreign_key: true
      t.references :department, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true
      t.string :status, default: 'document_upload_pending'
      t.timestamps
    end
  end
end
