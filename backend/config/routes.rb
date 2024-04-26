# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    namespace :v1 do
      post 'login', to: 'sessions#create'
      delete 'logout', to: 'sessions#destroy'

      resources :users, only: %i[index update show] do
        get 'friends', on: :member
        get 'search', on: :collection
        get 'status_updates', on: :member
      end

      resources :friend_requests, only: %i[new create index] do
        member do
          post 'accept'
          post 'reject'
        end
      end

      resources :status_updates, only: %i[index create]

      resources :notifications, only: %i[index update]
    end
  end
end
