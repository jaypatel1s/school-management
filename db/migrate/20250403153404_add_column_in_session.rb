class AddColumnInSession < ActiveRecord::Migration[7.1]
  def change
    add_reference :sessions, :course, foreign_key: true, null: false
    add_reference :sessions, :college, foreign_key: true, null: false
    add_reference :course_enrollments, :college, foreign_key: true, null: false
    add_reference :attendances, :college, foreign_key: true, null: false
    add_column :sessions, :slug, :string, limit: 255, null: false
    remove_column :attendances, :status, :string
    add_column :attendances, :status, :integer
  end
end
