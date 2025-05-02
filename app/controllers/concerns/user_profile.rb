module UserProfile
  extend ActiveSupport::Concern

  included do
    before_action :set_user_profile
  end

  private

  def set_user_profile
    @profile = current_user.teacher? ? current_user.teacher : (current_user.principal? ? current_user : current_user.student)
  end  
end
