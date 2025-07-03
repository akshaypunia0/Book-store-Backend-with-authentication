# 📚 Bookstore REST API

A simple and modular Bookstore REST API built with **Node.js** and **Express**, using **file-based JSON persistence** and **JWT-based authentication**.

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcryptjs
- uuid
- fs/promises
- ES Module syntax (`import`/`export`)

---

## 🧠 Features

### ✅ User Authentication
- `POST /api/register` → Register new user
- `POST /api/login` → Login and receive JWT token

### 📘 Book Management (Protected)
> Requires valid token (JWT)

- `GET /api/books` → Get all books
- `GET /api/books/:id` → Get book by ID
- `POST /api/books` → Add new book
- `PUT /api/books/:id` → Update a book
- `DELETE /api/books/:id` → Delete a book

✅ Only the user who created the book can update or delete it.

---

## 🔐 JWT Usage

After login, use the received token like this:

```http
Authorization: Bearer <your_token_here>

In Postman:

Go to Headers tab
Key = Authorization
Value = Bearer eyJhbGciOi...

## 📁 Folder Structure

BOOKSTORE-API/
├── config/
│ ├── controllers/ # Route handler logic (auth + books)
│ ├── middleware/ # JWT auth, logger, error handler
│ ├── models/ # File-read/write functions
│ ├── routes/ # Route definitions
│ └── utils/ # Helper functions (uuid, validators etc.)
├── data/ # JSON-based "database"
│ ├── books.json
│ └── users.json
├── .env # Environment secrets
├── .gitignore
├── index.js # Main app entry point
├── package.json
├── package-lock.json
└── README.md

If you are here, you already know what packages to install and how to run this project in your system locally.
