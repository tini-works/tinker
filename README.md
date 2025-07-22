# Invoice Approval System

A monorepo for the Invoice Approval System, containing both frontend and backend code.

## Project Structure

```
.
├── apps/
│   ├── frontend/     # React frontend application
│   └── backend/      # Express backend API
├── packages/
│   └── shared/       # Shared types and utilities
└── docs/             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v10 or later)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

To start all applications in development mode:

```bash
npm run dev
```

To start only the frontend:

```bash
npm run dev --filter=@invoice-approval/frontend
```

To start only the backend:

```bash
npm run dev --filter=@invoice-approval/backend
```

### Building

To build all applications:

```bash
npm run build
```

### Testing

To run tests for all applications:

```bash
npm run test
```

### Linting

To lint all applications:

```bash
npm run lint
```

## Tech Stack

- **Build Tools**: Turborepo, Vite
- **Frontend**: React, React Router, Tailwind CSS, DaisyUI
- **Backend**: Express, Node.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, DaisyUI v5
- **Testing**: Vitest, Jest
- **Linting**: ESLint, Prettier

