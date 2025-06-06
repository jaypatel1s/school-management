class CreateCsvFiles < ActiveRecord::Migration[7.1]
  def change
    create_table :csv_files do |t|
      t.string :name
      t.string :email
      t.string :role
      t.string :password
      t.references :college, null: false, foreign_key: true

      t.timestamps
    end
    add_index :csv_files, :email, unique: true
  end
end
