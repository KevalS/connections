module Api
  module V1
    class SessionsController < ApplicationController
      def create
        user = User.find_by(email: user_params[:email])

        if user
          session[:user_id] = user.id
          render json: { status: 'Logged in!', user_id: user.id, first_name: user.first_name, last_name: user.last_name, new_user: false}
        else
          user = User.create(email: user_params[:email])
          if user.id
            session[:user_id] = user.id
            render json: { status: 'Logged in!', user_id: user.id, first_name: user.first_name, last_name: user.last_name, new_user: true }
          else
            render json: { status: 'Unable to create account' }
          end
        end
      end

      def destroy
        session[:user_id] = nil
        render json: { status: 'Logged out!' }
      end

      private

      def user_params
        params.require(:user).permit(:email)
      end
    end
  end
end
