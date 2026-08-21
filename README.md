# Phonebook

A full-stack phonebook application built while working through
[Full Stack Open](https://fullstackopen.com/) — a React frontend backed by an
Express REST API.

**Live app:** https://fullstackopen-phonebook-alu9.onrender.com/

## Features

- List, search, add, and delete phonebook entries
- Basic form validation (name/number required, no duplicate names)

## Tech stack

- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express, Morgan

## Project structure

```
backend/    Express API, also serves the built frontend as static files
frontend/   React app (Vite)
```

## Running locally

**Backend** (serves on port 3001)

```
cd backend
npm install
npm run dev
```

**Frontend** (dev server with hot reload)

```
cd frontend
npm install
npm run dev
```

## Building for deployment

The backend serves the frontend's production build from `backend/dist`.
To build the frontend and copy it into the backend:

```
cd backend
npm run build:ui
```

## API endpoints

| Method | Endpoint             | Description               |
| ------ | --------------------- | -------------------------- |
| GET    | `/api/phonebook`      | List all entries           |
| GET    | `/api/phonebook/:id`  | Get a single entry         |
| POST   | `/api/phonebook`      | Create an entry            |
| PUT    | `/api/phonebook/:id`  | Update an entry            |
| DELETE | `/api/phonebook/:id`  | Delete an entry            |
| GET    | `/info`                | Entry count and server time |
