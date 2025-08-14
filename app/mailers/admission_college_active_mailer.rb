# frozen_string_literal: true

# :nodoc:
class AdmissionCollegeActiveMailer < ApplicationMailer
  def activate_college_admission(admission, college)
    @college = college
    @principal = college.users.find_by(role: "principal")
    mail(to: @principal.email, subject: 'New Admission Created, Please Login to your portal and activate your admission for this year')
  end
end
