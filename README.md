# TaskFlow

A project management application with real-time collaboration features. Users can create boards, assign tasks, set deadlines, and track progress across teams.

![TaskFlow](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Kanban Boards** - Create and manage multiple project boards with customizable columns
- **Real-time Collaboration** - See changes instantly as team members update tasks via WebSockets
- **Drag & Drop** - Intuitive task reordering and column movement
- **Task Management** - Assign members, set priorities, add labels, checklists, and due dates
- **Comments & Activity** - Discuss tasks with threaded comments and track activity history
- **Team Management** - Invite members to boards and manage permissions

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Redux Toolkit, React DnD |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Real-time | Socket.io |
| Auth | JWT, bcrypt |

## Getting Started

```bash
git clone https://github.com/hannan-rizwan/TaskFlow.git
cd TaskFlow
npm run install-all
cp .env.example .env
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/boards` | Get user boards |
| POST | `/api/boards` | Create new board |
| GET | `/api/tasks/board/:id` | Get board tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |

## Project Structure

```
TaskFlow/
  server/
    index.js          # Express server + Socket.io setup
    models/           # Mongoose schemas
    routes/           # API routes
    middleware/        # Auth middleware
  client/               # React frontend
  package.json
```

## License

MIT
