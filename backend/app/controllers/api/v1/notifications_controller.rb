# frozen_string_literal: true

module Api
  module V1
    class NotificationsController < ApplicationController
      def index
        if current_user
          notifications = current_user.notifications

          notifications = notifications.map do |notification|
            notification.attributes.merge(first_name: notification.actor.first_name, last_name: notification.actor.last_name)
          end

          render json: notifications
        else
          render json: { error: 'You must be logged in to view notifications' }, status: :unauthorized
        end
      end
    end
  end
end
