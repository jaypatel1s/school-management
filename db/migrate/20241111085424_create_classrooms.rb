class CreateClassrooms < ActiveRecord::Migration[7.0]
  def change
    create_table :classrooms do |t|
      t.references :college, null: false, foreign_key: true
      t.references :subject, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
