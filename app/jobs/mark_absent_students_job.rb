class MarkAbsentStudentsJob < ApplicationJob
  queue_as :default

  def perform(session_id)
    session = Session.find_by(id: session_id)
    session.mark_absent_students
  end
end
