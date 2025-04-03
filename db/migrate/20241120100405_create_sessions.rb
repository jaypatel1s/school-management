class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions do |t|
      t.string :name
      t.date :date
      t.time :start_time
      t.time :end_time
      t.string :qr_token
      t.string :location
      t.boolean :active, default: true

      t.timestamps
    end
    add_index :sessions, :qr_token, unique: true
  end
end
