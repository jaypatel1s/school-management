class AddColumnInSessions < ActiveRecord::Migration[7.0]
  def change
    add_column :sessions, :name, :string
  end
end
