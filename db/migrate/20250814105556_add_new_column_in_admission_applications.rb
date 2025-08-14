class AddNewColumnInAdmissionApplications < ActiveRecord::Migration[7.1]
  def change
    add_column :admission_applications, :application_number, :string
    add_column :admission_applications, :temporary_token, :string
    add_column :admission_applications, :email, :string
    add_column :admission_applications, :phone, :string
    add_column :admission_applications, :name, :string
    add_column :admission_applications, :slug, :string
    add_column :admission_applications, :expires_at, :datetime
    remove_column :admissions, :expires_at, :datetime
    add_column :admissions, :closed_at, :datetime
  end
end
