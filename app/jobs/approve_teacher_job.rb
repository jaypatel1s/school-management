# frozen_string_literal: true

class ApproveTeacherJob < ApplicationJob
  queue_as :default

  def perform(user)
    fetch_user = User.find_by(id: user.id)
    fetch_user.teacher_subjects.update_all(approved: true)
    fetch_user.teacher_classrooms.update_all(approved: true)

    TeacherMailer.profile_approved(fetch_user).deliver_now
  end
end
