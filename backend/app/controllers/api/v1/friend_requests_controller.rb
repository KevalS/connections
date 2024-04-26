# frozen_string_literal: true

module Api
  module V1
    class FriendRequestsController < ApplicationController
      def create
        @friend_request = FriendRequest.new(sender_id: current_user.id, receiver_id: friend_request_params[:receiver_id], status: 'pending')

        if @friend_request.save
          Notification.create(recipient_id: friend_request_params[:receiver_id], actor: current_user, action: 'friend_request_received', notifiable: @friend_request)
          render json: { message: 'Friend request sent successfully.' }, status: :created
        else
          render json: @friend_request.errors, status: :unprocessable_entity
        end
      end

      def index
        if current_user
          received_requests = current_user.received_friend_requests.pending
          received_requests = received_requests.map do |request|
            request.attributes.merge(first_name: request.sender.first_name, last_name: request.sender.last_name)
          end
          render json: received_requests
        else
          render json: { error: 'You must be logged in to view friend requests' }, status: :unauthorized
        end
      end

      def accept
        friend_request = current_user.received_friend_requests.find(params[:id])
        if friend_request.accept!
          current_user.add_friend(friend_request.sender)
          Notification.create(recipient: friend_request.sender, actor: friend_request.receiver, action: 'friend_request_accepted', notifiable: friend_request)

          render json: { message: 'Friend request accepted successfully.' }, status: :ok
        else
          render json: { error: 'Failed to accept friend request.' }, status: :unprocessable_entity
        end
      end

      def reject
        friend_request = current_user.received_friend_requests.find(params[:id])
        if friend_request.reject!
          render json: { message: 'Friend request rejected successfully.' }, status: :ok
        else
          render json: { error: 'Failed to reject friend request.' }, status: :unprocessable_entity
        end
      end

      private

      def friend_request_params
        params.require(:friend_request).permit(:receiver_id)
      end
    end
  end
end
