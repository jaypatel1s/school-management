class CreateAdmissions < ActiveRecord::Migration[7.1]
  def change
      create_table :admissions do |t|
      t.references :college, null: false, foreign_key: true
      t.references :department, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true
      t.references :user, null: true, foreign_key: true
      t.references :processed_by, null: true, foreign_key: { to_table: :users }
      t.string :application_number
      t.string :name, null: false
      t.string :email
      t.string :phone
      t.string :status, default: "pending"
      t.datetime :expires_at
      t.string :temporary_token
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
    add_index :admissions, [:application_number, :college_id], unique: true
    add_index :admissions, [:temporary_token, :college_id], unique: true
  end
end
