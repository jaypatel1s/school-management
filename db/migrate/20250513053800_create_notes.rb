# frozen_string_literal: true

# :nodoc:
class CreateNotes < ActiveRecord::Migration[7.1]
  def change
    create_table :notes do |t|
      t.bigint :notable_id
      t.string :notable_type
      t.text :note, limit: 30
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
