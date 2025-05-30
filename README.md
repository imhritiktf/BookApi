📚 Book Review REST API
A full-featured RESTful API for managing books and user reviews. Built using Node.js, Express, MongoDB, and JWT authentication with cookie-based session management.

🔧 Tech Stack
Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Authentication: JWT (stored in HTTP-only cookies)

Other Tools: Postman (for testing), bcryptjs, cookie-parser

✅ Features
🔐 Authentication
User Signup & Login (/api/auth/signup, /api/auth/login)

JWT-based protected routes using cookies

📘 Book Management
  Add a book (auth required)

  Get all books with pagination and filters

  Get a single book by ID

Search books by title or author (case-insensitive)

✍️ Review System
  Add one review per user per book

  Prevent duplicate reviews

  See all reviews for a specific book

📁 API Endpoints Overview
  🧑 Auth
  POST /api/auth/signup – Register a new user

  POST /api/auth/login – Log in a user

📚 Books
  GET /api/books – Get all books

  GET /api/books/search?query= – Search books

  GET /api/books/:id – Get single book

  POST /api/books/add – Add new book (protected)

✨ Reviews  
  POST /api/books/:id/reviews – Add a review (protected)

⚙️ Setup Instructions
#1. Clone the repo
git clone https://github.com/your-username/book-review-api.git
cd book-review-api

#2. Install the dependencies
npm install

#3. Create .env file or config.js
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

#4. Run the server
npm run dev
🔒 Authentication Strategy
JWT tokens are created upon login and stored as HTTP-only cookies for security.

Middleware (requireAuth) protects certain routes (e.g., adding books or reviews).

Token is verified on each request to validate the session.


🗂️ Schema Design
This project consists of three main collections: Users, Books, and Reviews. Below is a brief overview of each schema:

1. User Schema
  Handles user authentication and review tracking.

    username: String (required)

    email: String (required, unique)

    password: String (hashed, required)

    createdAt: Date (auto-generated)

2. Book Schema
  Stores book information added by authenticated users.

    title: String (required)

    author: String (required)

    genre: String (required)

    publishedYear: Number (required)

    createdBy: ObjectId (references User, required)

    createdAt: Date (auto-generated)

3. Review Schema
  Captures user reviews for books.

    user: ObjectId (references User, required)

    book: ObjectId (references Book, required)

    rating: Number (1–5, required)

    comment: String (required)

    createdAt: Date (auto-generated)

✅ Each user can submit only one review per book (enforced via a unique compound index).



📬 Contact
Made with ❤️ by Hritik
📧 Email: ritikmodanwal101@gmail.com
