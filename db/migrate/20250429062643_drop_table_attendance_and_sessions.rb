class DropTableAttendanceAndSessions < ActiveRecord::Migration[7.1]
  def change
    reversible do |dir|
      dir.up do
        drop_table :attendances, if_exists: true
        drop_table :sessions, if_exists: true

        create_table :sessions do |t|
          t.references :college, null: false, foreign_key: true
          t.references :department, null: false, foreign_key: true
          t.references :course, null: false, foreign_key: true
          t.references :teacher, null: false, foreign_key: true
          t.datetime :date, null: false
          t.string :name, null: false
          t.string :slug, limit: 255, null: false

          t.timestamps
        end

        create_table :attendances do |t|
          t.references :college, null: false, foreign_key: true
          t.references :department, null: false, foreign_key: true
          t.references :session, null: false, foreign_key: true
          t.references :student, null: false, foreign_key: true
          t.integer :status, null: false

          t.timestamps
        end
      end

      dir.down do
        drop_table :attendances
        drop_table :sessions
      end
    end
  end
end
