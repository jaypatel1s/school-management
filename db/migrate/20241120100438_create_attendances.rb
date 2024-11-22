class CreateAttendances < ActiveRecord::Migration[7.0]
  def change
    create_table :attendances do |t|
      t.references :college, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :session, null: false, foreign_key: true
      t.integer :status,  default: 0
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
