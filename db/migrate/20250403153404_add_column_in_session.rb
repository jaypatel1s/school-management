class AddColumnInSession < ActiveRecord::Migration[7.1]
  def change
    add_reference :sessions, :course, foreign_key: true, null: false
    add_reference :sessions, :college, foreign_key: true, null: false
  end
end
