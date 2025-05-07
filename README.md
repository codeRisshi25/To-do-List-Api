```

.######...####...#####....####...........##......######...####...######...........####...#####...######.........
...##....##..##..##..##..##..##..........##........##....##........##............##..##..##..##....##...........
...##....##..##..##..##..##..##..........##........##.....####.....##............######..#####.....##...........
...##....##..##..##..##..##..##..........##........##........##....##............##..##..##........##...........
...##.....####...#####....####...........######..######...####.....##............##..##..##......######.........
................................................................................................................

```

A RESTful API for managing tasks and user authentication, built with Node.js, Express, and PostgreSQL.

## Table of Contents

- Features
- Tech Stack
- API Endpoints
  - Authentication
  - Tasks
- Getting Started
  - Prerequisites
  - Installation
  - Environment Variables
- Database Schema
- Security
- Deployment to Azure
- License

## Features

- User authentication (signup, login, logout)
- JSON Web Token (JWT) based authentication
- Create, read, and update tasks
- Mark tasks as complete/incomplete
- User-specific task management
- Health check endpoint

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT, bcrypt
- **Tools**: dotenv, cors

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Authenticate a user and get access token |
| `POST` | `/logout` | Logout a user |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks/get` | Get all tasks for authenticated user |
| `POST` | `/tasks/add` | Create a new task |
| `PATCH` | `/tasks/:tid/status` | Update task completion status |
| `DELETE` | `/tasks/:tid/delete` |	Delete a task |

## Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/todo-list-api.git
cd todo-list-api

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials and JWT secrets

# Initialize the database
node config/syncData.js

# Start the server
npm start
```

### Environment Variables

```
PORT=7575
DB_NAME='todo_api'
DB_USER='todo_user'
DB_PASSWORD='your_password'
DB_HOST='localhost'
DB_PORT=5432
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Generate secure secrets using:

```bash
node utils/genAccessToken.js
```

## Database Schema

### Users Table

| Column | Type | Description |
|--------|------|-------------|
| uid | INTEGER | Primary key, auto-increment |
| username | STRING | Unique username |
| password | STRING | Hashed password |
| loggedin | BOOLEAN | User login status |
| createdAt | DATE | User creation timestamp |
| updatedAt | DATE | User update timestamp |

### Tasks Table

| Column | Type | Description |
|--------|------|-------------|
| tid | INTEGER | Primary key, auto-increment |
| title | STRING | Task title |
| description | TEXT | Task description (optional) |
| completed | BOOLEAN | Task completion status |
| uid | INTEGER | Foreign key to users table |
| createdAt | DATE | Task creation timestamp |
| updatedAt | DATE | Task update timestamp |

## Security

- Passwords are hashed using bcrypt
- Authentication is handled with JSON Web Tokens
- Tasks are associated with specific users for data isolation
- Input validation for all API endpoints

## License

This project is licensed under the MIT License - see the LICENSE file for details.