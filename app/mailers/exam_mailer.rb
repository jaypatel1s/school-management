# frozen_string_literal: true

# app/mailers/exam_mailer.rb
class ExamMailer < ApplicationMailer
  def attendance_csv(teacher, exam, file_path)
    @teacher = teacher
    @exam = exam

    attachments["exam_#{exam.id}_attendance.csv"] = File.read(file_path)

    # skip template rendering
    mail(to: teacher.user.email, subject: "Attendance CSV for #{exam.name}") do |format|
      format.text { render plain: 'Please find the attendance CSV attached.' }
    end
  end
end
