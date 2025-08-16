class RemoveObsoleteFieldsFromAdmissions < ActiveRecord::Migration[7.1]
  def change
    remove_column :admissions, :user_id, :integer
    remove_column :admissions, :processed_by_id, :integer
    remove_column :admissions, :application_number, :string
    remove_column :admissions, :temporary_token, :string
    remove_column :admissions, :email, :string
    remove_column :admissions, :phone, :string
  end
end
