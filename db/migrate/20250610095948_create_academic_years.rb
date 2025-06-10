class CreateAcademicYears < ActiveRecord::Migration[7.1]
  def change
    create_table :academic_years do |t|
      t.references :college, null: false, foreign_key: true
      t.string :name
      t.date :start_date
      t.date :end_date
      t.boolean :current
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
