class ApplicationMailer < ActionMailer::Base
  default from: Rails.application.credentials.dig(:smtp, :smtp_username)
  layout "mailer"
end
