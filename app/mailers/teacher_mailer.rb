class TeacherMailer < ApplicationMailer

  def profile_approved(user)
    @teacher = user # Pass the user object
    # @teacher_subjects = @teacher.teacher_subjects

    mail(to: user.email, subject: 'Your Profile Has Been Approved')
  end
end