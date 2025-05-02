class ApplicationMailer < ActionMailer::Base
  default from: Rails.application.credentials.dig(:email, :smtp_from_mail)
  layout "mailer"
end
