# frozen_string_literal: true

module Teachers
  # :nodoc:
  class NotificationsController < BaseController
    def index
      @notifications = current_user.notifications.order(created_at: :desc)
    end
  end
end
