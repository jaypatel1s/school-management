class AddExamAttendanceToExamResults < ActiveRecord::Migration[7.1]
  def change
    # Add the new, correct foreign key
    # We make it `null: true` so it can be added to existing records.
    add_reference :exam_results, :exam_attendance, null: true, foreign_key: true

    # =================================================================
    # Per your request, the old columns are NOT removed.
    # The 'remove_reference' lines have been commented out.
    # =================================================================
    # remove_reference :exam_results, :exam
    # remove_reference :exam_results, :student
    # remove_reference :exam_results, :college
  end
end