class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions do |t|
      t.references :classroom, null: false, foreign_key: true
      t.datetime :date

      t.timestamps
    end
  end
end
