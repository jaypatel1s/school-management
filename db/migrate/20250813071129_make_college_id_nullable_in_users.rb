class MakeCollegeIdNullableInUsers < ActiveRecord::Migration[7.1]
  def change
    change_column_null :users, :college_id, true
    add_column :admissions, :start_date, :datetime
    add_column :admissions, :end_date, :datetime
  end
end
