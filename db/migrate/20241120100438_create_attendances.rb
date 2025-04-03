class CreateAttendances < ActiveRecord::Migration[7.0]
  def change
    create_table :attendances do |t|
      t.references :session, foreign_key: true, null: false
      t.references :student, foreign_key: { to_table: :users }, null: false
      t.string :status
      t.datetime :marked_at
      t.string :ip_address

      t.timestamps
    end
    add_index :attendances, [:session_id, :student_id], unique: true
  end
end
