# Development Guide

This document provides detailed information about the development setup and workflow for the Invoice Approval System.

## Monorepo Architecture

The Invoice Approval System uses a monorepo architecture managed by Turborepo. This allows us to:

- Share code between frontend and backend
- Maintain consistent versioning
- Simplify dependency management
- Coordinate build, test, and lint processes

### Key Configuration Files

- **package.json**: Defines workspaces and root-level scripts
- **turbo.json**: Configures the Turborepo pipeline
- **tsconfig.base.json**: Provides base TypeScript configuration for all workspaces
- **.eslintrc.js**: Provides base ESLint configuration
- **.prettierrc**: Configures Prettier for code formatting

## Workspace Details

### Frontend (apps/frontend)

The frontend is a React application built with:

- **Vite**: Fast build tool and development server
- **React**: UI library
- **React Router**: Client-side routing
- **Tailwind CSS 4**: Utility-first CSS framework
- **DaisyUI v5**: Component library for Tailwind CSS
- **TypeScript**: Type-safe JavaScript
- **Vitest**: Testing framework

#### Frontend Structure

```
apps/frontend/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components
│   │   └── layout/   # Layout components
│   ├── pages/        # Page components
│   │   ├── dashboard/
│   │   └── invoices/
│   ├── App.tsx       # Main application component
│   ├── main.tsx      # Application entry point
│   └── index.css     # Global styles
├── index.html        # HTML template
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── vite.config.ts    # Vite configuration
└── tailwind.config.js # Tailwind CSS configuration
```

### Backend (apps/backend)

The backend is an Express API built with:

- **Express**: Web framework for Node.js
- **TypeScript**: Type-safe JavaScript
- **Jest**: Testing framework
- **dotenv**: Environment variable management

#### Backend Structure

```
apps/backend/
├── src/
│   ├── controllers/  # Request handlers
│   ├── models/       # Data models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── utils/        # Utility functions
│   └── index.ts      # Application entry point
├── package.json      # Dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

### Shared Package (packages/shared)

The shared package contains:

- **Types**: TypeScript interfaces and types
- **Utilities**: Shared utility functions
- **Constants**: Shared constants

#### Shared Package Structure

```
packages/shared/
├── src/
│   ├── types.ts      # Shared types and interfaces
│   ├── utils.ts      # Shared utility functions
│   └── index.ts      # Package entry point
├── package.json      # Dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## Development Workflow

### Starting Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start all development servers:
   ```bash
   npm run dev
   ```

3. Access the applications:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:4000

### Building for Production

1. Build all applications:
   ```bash
   npm run build
   ```

2. The build output will be in:
   - Frontend: `apps/frontend/dist`
   - Backend: `apps/backend/dist`
   - Shared: `packages/shared/dist`

### Running Tests

1. Run all tests:
   ```bash
   npm run test
   ```

2. Run tests for a specific workspace:
   ```bash
   npm run test --filter=@invoice-approval/frontend
   ```

### Linting and Formatting

1. Lint all code:
   ```bash
   npm run lint
   ```

2. Format all code:
   ```bash
   npm run format
   ```

## Working with the Shared Package

### Building the Shared Package

When making changes to the shared package, you need to build it before the changes are available to other workspaces:

```bash
npm run build --filter=@invoice-approval/shared
```

### Using the Shared Package

To use the shared package in a workspace:

```typescript
// Import shared types
import { Invoice, PaymentRequest } from '@invoice-approval/shared';

// Import shared utilities
import { formatCurrency, formatDate } from '@invoice-approval/shared';
```

### Adding to the Shared Package

When adding new functionality to the shared package:

1. Add your code to the appropriate file in `packages/shared/src`
2. Export it from `packages/shared/src/index.ts`
3. Build the shared package
4. Import it in the frontend or backend

## Turborepo Pipeline

The Turborepo pipeline is configured in `turbo.json` and defines the dependencies between tasks:

- **build**: Builds all workspaces (shared package first)
- **dev**: Starts development servers for all workspaces
- **lint**: Runs linting for all workspaces
- **test**: Runs tests for all workspaces (after building)

## Environment Variables

- Frontend environment variables should be prefixed with `VITE_` and defined in `.env` files
- Backend environment variables should be defined in `.env` files
- Use `dotenv` to load environment variables in the backend

## Deployment

### Frontend Deployment

The frontend can be deployed to any static hosting service:

1. Build the frontend:
   ```bash
   npm run build --filter=@invoice-approval/frontend
   ```

2. Deploy the contents of `apps/frontend/dist` to your hosting service

### Backend Deployment

The backend can be deployed to any Node.js hosting service:

1. Build the backend:
   ```bash
   npm run build --filter=@invoice-approval/backend
   ```

2. Deploy the contents of `apps/backend/dist` to your hosting service
3. Set up environment variables on your hosting service

## Troubleshooting

### Common Issues

#### Changes to Shared Package Not Reflected

If changes to the shared package are not reflected in the frontend or backend:

1. Make sure you've built the shared package:
   ```bash
   npm run build --filter=@invoice-approval/shared
   ```

2. Restart the development servers:
   ```bash
   npm run dev
   ```

#### TypeScript Errors

If you're seeing TypeScript errors:

1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. Check that the TypeScript configuration is correct
3. Run TypeScript in watch mode to see errors in real-time:
   ```bash
   npx tsc --noEmit --watch
   ```

#### Build Errors

If you're seeing build errors:

1. Check the console for specific error messages
2. Make sure all dependencies are installed
3. Try cleaning the build cache:
   ```bash
   npx turbo clean
   ```

4. Rebuild:
   ```bash
   npm run build
   ```

