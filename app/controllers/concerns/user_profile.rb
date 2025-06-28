# frozen_string_literal: true

# :nodoc:
module UserProfile
  extend ActiveSupport::Concern

  included do
    before_action :set_user_profile
  end

  private

  def set_user_profile
    return false if current_user.nil?

    @profile = if current_user&.teacher?
                 current_user&.teacher
               else
                 (current_user&.principal? ? current_user : current_user&.student)
               end
  end
end
