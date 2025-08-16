class RemoveCollegeDepartmentCourseFromAdmissions < ActiveRecord::Migration[7.1]
  def change
    remove_reference :admissions, :college, foreign_key: true
    remove_reference :admissions, :department, foreign_key: true
    remove_reference :admissions, :course, foreign_key: true
    remove_reference :admission_documents, :admission, foreign_key: true
  end
end
