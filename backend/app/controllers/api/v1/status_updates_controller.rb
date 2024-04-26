# frozen_string_literal: true

module Api
  module V1
    class StatusUpdatesController < ApplicationController

      def index
        if current_user
          status_updates = current_user.friends.map(&:status_updates).flatten.sort_by(&:created_at).reverse

          status_updates = status_updates.map do |status_update|
            status_update.attributes.merge(first_name: status_update.user.first_name, last_name: status_update.user.last_name)
          end
          render json: status_updates
        else
          render json: { error: 'You must be logged in to view status updates' }, status: :unauthorized
        end
      end

      def create
        status_update = current_user.status_updates.new(status_update_params)
        if status_update.save
          current_user.friends.each do |friend|
            Notification.create(recipient: friend, actor: current_user, action: 'posted', notifiable: status_update)
          end
          render json: { message: 'Status updated successfully' }, status: :created
        else
          render json: status_update.errors, status: :unprocessable_entity
        end
      end

      private

      def status_update_params
        params.require(:status_update).permit(:context)
      end
    end
  end
end
