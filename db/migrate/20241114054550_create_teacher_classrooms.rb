class CreateTeacherClassrooms < ActiveRecord::Migration[7.0]
  def change
    create_table :teacher_classrooms do |t|
      t.references :user, null: false, foreign_key: true
      t.references :classroom, null: false, foreign_key: true
      t.references :subject, null: false, foreign_key: true

      t.timestamps
    end
  end
end
