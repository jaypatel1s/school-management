# frozen_string_literal: true

# :nodoc:
class AdmissionMailer < ApplicationMailer
  def temporary_token(admission)
    @admission = admission
    mail(to: @admission.email, subject: 'Your new admission token')
  end
end
