class AddIndexInRemainingModule < ActiveRecord::Migration[7.1]
  def change
    add_index :courses, [:name, :college_id], unique: true
    add_index :departments, [:name, :college_id], unique: true
    add_index :academic_years, [:name, :college_id], unique: true
    remove_column :semesters, :current
  end
end
