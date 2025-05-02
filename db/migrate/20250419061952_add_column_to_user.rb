class AddColumnToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :profile_setup, :boolean, default: false
    add_reference :teachers, :user, null: false, foreign_key: true
    add_reference :students, :user, null: false, foreign_key: true
  end
end
