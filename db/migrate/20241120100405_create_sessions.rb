class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions do |t|
      t.references :college, null: false, foreign_key: true
      t.datetime :date
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
