class CreateAttendances < ActiveRecord::Migration[7.0]
  def change
    create_table :attendances do |t|
      t.references :session, foreign_key: true, null: false
      t.string :status
      t.datetime :marked_at
      t.string :ip_address

      t.timestamps
    end
  end
end
