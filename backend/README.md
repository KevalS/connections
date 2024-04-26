# README

# FRIENDS CONNECTION

*FRIENDS CONNECTION* is a social networking application built with Ruby on Rails and React. Users can send and receive friend requests, and view a list of their friends. Users can also post status updates and view status updates of their friends. This repository contains the backend api, which is built on Ruby on Rails.

**Features**
Users can sign up, log in, and log out. When a user 
Friend requests: Users can send, accept, and reject friend requests.
Friends list: Users can view a list of their friends.
Status Updates: Users can post status updates and view status updates of their friends
Notifications: Users would receive notifications when a friends posts a status update, when they get a friend request, and when their friend request gets accepted.

**Getting Started**
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

*Prerequisites*
Ruby [3.3.0]
Rails [7.1.3]

# Installation

Clone the repository: git clone **https://github.com/** 
Navigate into the directory: cd friends-connection
Install the dependencies: bundle install
Set up the database: rails db:create db:migrate
Seed the database with users: rails db:seed
Start the server: rails server

Built With
Ruby on Rails - The web framework used
React - The frontend library used
PostgreSQL - The database used
Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

# Deployment

This application is ready to be deployed on Heroku. Here are the steps to deploy the application:

1. **Create a new Heroku app**: You can do this on the [Heroku Dashboard](https://dashboard.heroku.com/apps).

2. **Set up your Heroku remote**: In your terminal, navigate to your project directory and run the following command, replacing `your-heroku-app-name` with the name of your Heroku app:

```bash
heroku git:remote -a your-heroku-app-name
```
3. **Push your code to Heroku**: You can deploy your application by pushing your code to the Heroku remote:

```bash
git push heroku main
```
4. **Run migrations**: After deploying your code, you need to run migrations on Heroku:

```bash
heroku run rails db:migrate
```

# API Documentation

1) **FriendRequestsAPI**
This controller handles friend requests in the application. It has four actions: create, index, accept, and reject.

*POST /friend_requests*
Creates a new friend request.

Parameters
receiver_id: The ID of the user to whom the friend request is being sent.
user_id: The Id of the current user

Responses
201 Created: The friend request was successfully created. The response body contains the friend request.
422 Unprocessable Entity: The friend request could not be created. The response body contains the errors.

*GET /friend_requests*
Lists all pending friend requests received by the current user.

Parameters
user_id: The Id of the current user

Responses
200 OK: The request was successful. The response body contains an array of friend requests, each with the sender's first and last name.

*POST /friend_requests/:id/accept*
Accepts a friend request.

Parameters
user_id: The Id of the current user
id: The ID of the friend request to accept.

Responses
200 OK: The friend request was successfully accepted. The response body contains a success message.
422 Unprocessable Entity: The friend request could not be accepted. The response body contains an error message.

*POST /friend_requests/:id/reject*
Rejects a friend request.

Parameters
user_id: The Id of the current user
id: The ID of the friend request to reject.

Responses
200 OK: The friend request was successfully rejected. The response body contains a success message.
422 Unprocessable Entity: The friend request could not be rejected. The response body contains an error message.

2) **NotificationsAPI**
This controller handles notifications in the application. It has one action: index.

GET /api/v1/notifications
Lists all notifications for the current user.

Parameters
user_id: The Id of the current user

Responses
200 OK: The request was successful. The response body contains an array of notifications for the current user.

3) **SessionsController**
This controller handles sessions in the application. It has two actions: create and destroy.

*POST /api/v1/sessions*
Creates a new session (logs in a user).

Parameters
email: The email of the user to log in.

Responses
200 OK: The user was successfully logged in. The response body contains a status message, the user's ID, first name, last name, and a flag indicating whether this is a new user.
200 OK: The user was not found, but a new account was successfully created and the user was logged in. The response body contains a status message, the user's ID, first name, last name, and a flag indicating that this is a new user.
200 OK: The user was not found and a new account could not be created. The response body contains a status message.

*DELETE /api/v1/sessions*
Destroys the current session (logs out the current user).

Responses
200 OK: The user was successfully logged out. The response body contains a status message.

4) **StatusUpdatesController**
This controller handles status updates in the application. It has two actions: index and create.

*GET /api/v1/status_updates*
Lists all status updates from the current user's friends.

Responses
200 OK: The request was successful. The response body contains an array of status updates, each with the status update's attributes and the first and last name of the user who posted the status update.

*POST /api/v1/status_updates*
Creates a new status update.

Parameters
user_id: The Id of the current user
content: The content of the status update.

Responses
201 Created: The status update was successfully created. The response body contains a success message.
422 Unprocessable Entity: The status update could not be created. The response body contains the errors.

5) **UsersController**
This controller handles users in the application. It has three actions: index, update, and show.

*GET /api/v1/users*
Lists all users, excluding the current user and their friends. For each user, it includes the count of their friends and the friendship status with the current user.

Parameters
user_id: The Id of the current user

Responses
200 OK: The request was successful. The response body contains an array of users, each with the user's attributes, the count of their friends, and the friendship status with the current user.

*PATCH /api/v1/users/:id*
Updates a user.

Parameters
user_id: The Id of the current user
id: The ID of the user to update.
user: A hash of the attributes to update. This should be nested under the user key.

Responses
200 OK: The user was successfully updated. The response body contains a success message.
422 Unprocessable Entity: The user could not be updated. The response body contains the errors.

*GET /api/v1/users/:id*
Shows a user.

Parameters
id: The ID of the user to show.

Responses
200 OK: The request was successful. The response body contains the user's attributes.



