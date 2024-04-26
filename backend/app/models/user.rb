# frozen_string_literal: true

class User < ApplicationRecord
  validates :email, uniqueness: true
  has_many :sent_friend_requests, class_name: 'FriendRequest', foreign_key: 'sender_id'
  has_many :received_friend_requests, class_name: 'FriendRequest', foreign_key: 'receiver_id'
  has_many :status_updates
  has_many :notifications, foreign_key: :recipient_id
  has_many :friendships
  has_many :friends, through: :friendships

  has_many :reverse_friendships, class_name: 'Friendship', foreign_key: 'friend_id'
  has_many :reverse_friends, through: :reverse_friendships, source: :user

  def add_friend(other_user)
    friends << other_user
    reverse_friends << other_user
  end

  def friendship_status(user)
    friend_requests = FriendRequest.where(sender: self, receiver: user).pending

    if friend_requests.pending.exists?
      'pending'
    elsif friend_requests.rejected.exists?
      'rejected'
    end
  end
end
