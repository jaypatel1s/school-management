class AddTeacherSubjectIdToTeacherClassrooms < ActiveRecord::Migration[7.0]
  def change
    add_reference :teacher_classrooms, :teacher_subject, null: false, foreign_key: true
  end
end
