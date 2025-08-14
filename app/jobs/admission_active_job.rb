# frozen_string_literal: true

# :nodoc:
class AdmissionActiveJob < ApplicationJob
  queue_as :default

  def perform(admission, colleges)
    colleges.each do |college|
      AdmissionCollegeActiveMailer.activate_college_admission(admission, college).deliver_now
    end
  end
end
