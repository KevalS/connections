# frozen_string_literal: true

class Notification < ApplicationRecord
  belongs_to :recipient, class_name: 'User'
  belongs_to :actor, class_name: 'User'
  belongs_to :notifiable, polymorphic: true

  after_commit :broadcast_to_recipient, on: :create

  def broadcast_to_recipient
    ActionCable.server.broadcast("user_notifications_#{recipient_id}", self)
  end
end
