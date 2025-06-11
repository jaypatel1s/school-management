class AddAndRemoveColumnFromAcademicYear < ActiveRecord::Migration[7.1]
  def change
    # remove_column :academic_years, :current
    add_reference :academic_years, :department, foreign_key: true, null: false
  end
end
