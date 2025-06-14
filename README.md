PostVerse

PostVerse is a full-stack Node.js application implementing user registration, authentication, and content posting functionality using MongoDB, JWT, and bcrypt. 
Users can sign up, log in, create posts, view all posts, like them, edit their content, and view their personal posts.
This app demonstrates real-world practices like token-based authentication, secure password hashing, and dynamic rendering with EJS templates.

Features

- User registration with password hashing
- Secure login using JWT tokens and cookies
- Authenticated home page with user information
- Create, edit, and delete posts
- Like functionality for posts
- View personal posts
- Dynamic UI with EJS templates
- MongoDB database with Mongoose

--------------------------------------------
Tech Stack

Server: Node.js, Express
View Engine: EJS
Authentication: JSON Web Tokens (JWT), bcrypt
Database: MongoDB with Mongoose
Utilities: Cookie Parser, Express Middleware

-------------------------------------------
Installation and Running Locally

1. Clone the repository
  git clone https://github.com/yourusername/postverse.git
  cd postverse
2. Install dependencies
  npm install
3. Set up MongoDB
4. Run the server
  node index.js

The app will be available at http://localhost:3000

---------------------------------------------------
Routes Overview

User Authentication
GET /                Registration page
POST /create/user    Register a new user
GET /login           Login page
POST /login          Authenticate and log in
GET /logout          Log out and clear cookies
_________________________

Home and Posts
GET /home            Authenticated home page
GET /post            Post creation page
POST /create/post    Create a new post
POST /allpost        View all posts
POST /post/:id       View posts by specific user
GET /like/:id        Like a specific post
_________________________

Post Management
GET /editpost/:id         Render post edit form
POST /editProcess/:id     Update post content
