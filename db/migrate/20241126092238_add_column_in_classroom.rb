class AddColumnInClassroom < ActiveRecord::Migration[7.0]
  def change
    add_reference :classrooms, :subject, null: false, foreign_key: true
  end
end
