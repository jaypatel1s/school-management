class AddApprovedToTeacherSubjectAndClassroom < ActiveRecord::Migration[7.0]
  def change
    add_column :teacher_subjects, :approved, :boolean, default: false
    add_column :teacher_classrooms, :approved, :boolean, default: false
  end
end
