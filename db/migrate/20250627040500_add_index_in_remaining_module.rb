class AddIndexInRemainingModule < ActiveRecord::Migration[7.1]
  def change
    add_index :courses, [:name, :college_id], unique: true
    add_index :departments, [:name, :college_id], unique: true
  end
end
