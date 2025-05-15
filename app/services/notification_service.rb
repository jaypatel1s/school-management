# frozen_string_literal: true

# :nodoc:
class NotificationService
  attr_accessor :college, :notifiable, :message, :action_type

  def initialize(college, notifiable, message, action_type)
    @college = college
    @notifiable = notifiable
    @message = message
    @action_type = action_type
  end

  def call
    notify_teachers
  end

  private

  def notify_teachers
    college.users.where(role: 'teacher').find_each do |teacher|
      college.notifications.create!(
        recipient: teacher,
        notifiable: notifiable,
        message: message,
        action_type: action_type,
        read: false
      )
    end
  end
end
