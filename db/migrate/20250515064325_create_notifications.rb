class CreateNotifications < ActiveRecord::Migration[7.1]
  def change
    create_table :notifications do |t|
      t.string :message
      t.references :notifiable, polymorphic: true, null: false
      t.references :college, null: false, foreign_key: true
      t.references :recipient, null: false, foreign_key: { to_table: :users } # ✅ ensures correct FK to users
      t.boolean :read
      t.string :action_type

      t.timestamps
    end
  end
end
