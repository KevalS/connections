# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      def index
        friends_ids = current_user.friends.pluck(:id)
        users = User.where.not(id: friends_ids + [current_user.id])

        users_with_friends_count = users.map do |user|
          user.attributes.merge(friends_count: user.friends.count, status: current_user.friendship_status(user))
        end

        render json: users_with_friends_count
      end

      def update
        user = User.find(params[:id])
        if user.update(user_params)
          render json: { message: 'User was successfully updated.' }, status: :ok
        else
          render json: user.errors, status: :unprocessable_entity
        end
      end

      def show
        begin
          user = User.find(params[:id])
          render json: user
        rescue ActiveRecord::RecordNotFound
          render json: { error: 'User not found' }, status: :not_found
        end
      end

      def friends
        users_with_friends_count = current_user.friends.map do |user|
          user.attributes.merge(friends_count: user.friends.count, status: current_user.friendship_status(user), status_updates: user.status_updates)
        end
        render json: users_with_friends_count
      end

      private

      def user_params
        params.require(:user).permit(:first_name, :last_name)
      end
    end
  end
end
