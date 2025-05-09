# frozen_string_literal: true

# :nodoc:
module UserProfile
  extend ActiveSupport::Concern

  included do
    before_action :set_user_profile
  end

  private

  def set_user_profile
    return unless current_user  # ✅ avoid nil error
  
    @profile =
      if current_user.teacher?
        current_user.teacher
      elsif current_user.principal?
        current_user
      else
        current_user.student
      end
  end  
end
