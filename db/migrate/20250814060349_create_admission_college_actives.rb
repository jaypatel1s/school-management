class CreateAdmissionCollegeActives < ActiveRecord::Migration[7.1]
  def change
    create_table :admission_college_actives do |t|
      t.references :admission, null: false, foreign_key: true
      t.references :college, null: false, foreign_key: true
      t.boolean :active
      t.datetime :activation_date

      t.timestamps
    end

    add_index :admission_college_actives, [:admission_id, :college_id], unique: true
  end
end
