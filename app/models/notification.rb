# frozen_string_literal: true

# :nodoc:
class Notification < ApplicationRecord
  belongs_to :college
  belongs_to :notifiable, polymorphic: true
  belongs_to :recipient, class_name: 'User', inverse_of: :notifications

  enum :action_type, { created: 'created', updated: 'updated', deleted: 'deleted', deactivated: 'deactivated' }
  scope :unread, -> { where(read: false) }
end
