# Fastify Users API

A simple Fastify API for managing users with CRUD operations.

## 🚀 Installation

```bash
npm install
```

## 🏃‍♂️ Run the Server

```bash
npm start
```

The server will listen at `http://localhost:3000`.

## 📚 API Endpoints

- **GET /users** - Retrieve all users
- **GET /users/:id** - Get a user by ID
- **POST /users** - Create a new user
  - Request body: `{ "name": "John" }`
- **PUT /users/:id** - Update user details
  - Request body: `{ "name": "Updated Name" }`
- **DELETE /users/:id** - Delete a user

## ✅ Example Request with REST Client

```http
### Get All Users
GET http://localhost:3000/users

### Create a User
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Francesco"
}
```

## 🧪 Running Tests

Use a REST client (like the REST Client extension in VSCode) or `curl` for testing.

## 💡 Notes

- The user data is stored in memory (use a real database for production).
- The routes are registered under the `/users` prefix.
