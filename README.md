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
Project Structure

project/
├── Models/
│   ├── userModel.js
│   └── post.js
├── Public/
├── Views/
│   ├── Register.ejs
│   ├── login.ejs
│   ├── home.ejs
│   ├── post.ejs
│   ├── myposts.ejs
│   ├── allpost.ejs
│   └── editPage.ejs
├── index.js
├── package.json
└── .gitignore

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

