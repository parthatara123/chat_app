# Socket.io Chat Application

This is a simple real-time chat application built with Node.js and Socket.io. Users can register, log in, and participate in real-time chat sessions within chatrooms.

## Features

- User registration and login with JSON Web Tokens (JWT) for authentication.
- Real-time chat.
- Messages are stored in a MongoDB database.
- Uses Socket.io for real-time communication.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your system.
- MongoDB installed and running.
- Postman for testing the API endpoints.

## Setup

1. Clone this repository to your local machine

2. Install project dependencies:
   cd chat_app
   npm install

3. Configure the application:

Create a .env file in the project root and set the following environment variables:
MONGO_URI: Your MongoDB connection URI.
SECRET_KEY: Your secret key for JWT authentication.
SALT and SECRET: Any difficult password type string for security
PORT: value of port on which you want to run your server


4. Start the application:
npm run start
The server will run on http://localhost:8000. You can access the chat interface in your web browser at by opening index.html page.

5. Postman collection : https://api.postman.com/collections/23451351-042d3273-358a-440f-b58f-9c35a184eaf4?access_key=PMAT-01HESX6E44P929XNKY2HTRSQ7G

## Usage
Open index.html page in your web browser to access the chat interface.

Register a new user or log in with your credentials to obtain a JWT token using postman.

Use Postman to test the API endpoints for registration and login.

Pass your JWT token and chatroomId in the index.html file to start sending messages in real-time.

