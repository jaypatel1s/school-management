class ApplicationMailer < ActionMailer::Base
  default from: ENV['SMTP_FROM_MAIL']
  layout "mailer"
end
