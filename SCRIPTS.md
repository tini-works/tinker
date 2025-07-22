# Available Scripts

This document provides an overview of all available scripts in the monorepo.

## Root Scripts

Run these scripts from the root directory to execute them across all workspaces:

- `npm run build` - Build all packages and applications
- `npm run dev` - Start development servers for all applications
- `npm run lint` - Run linting across all workspaces
- `npm run lint:fix` - Fix linting issues across all workspaces
- `npm run format` - Format all code using Prettier
- `npm run format:check` - Check if all code is properly formatted
- `npm run test` - Run tests across all workspaces
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage reports
- `npm run clean` - Clean build artifacts and node_modules
- `npm run start` - Start all applications in production mode

## Workspace-specific Scripts

### Frontend (`apps/frontend`)

- `npm run dev` - Start the frontend development server
- `npm run build` - Build the frontend for production
- `npm run lint` - Run linting on frontend code
- `npm run lint:fix` - Fix linting issues in frontend code
- `npm run preview` - Preview the production build locally
- `npm run test` - Run frontend tests
- `npm run test:watch` - Run frontend tests in watch mode
- `npm run test:coverage` - Run frontend tests with coverage reports
- `npm run clean` - Clean frontend build artifacts
- `npm run start` - Start the frontend in production mode

### Backend (`apps/backend`)

- `npm run dev` - Start the backend development server
- `npm run build` - Build the backend for production
- `npm run start` - Start the backend in production mode
- `npm run lint` - Run linting on backend code
- `npm run lint:fix` - Fix linting issues in backend code
- `npm run test` - Run backend tests
- `npm run test:watch` - Run backend tests in watch mode
- `npm run test:coverage` - Run backend tests with coverage reports
- `npm run clean` - Clean backend build artifacts

### Shared (`packages/shared`)

- `npm run build` - Build the shared package
- `npm run dev` - Build the shared package in watch mode
- `npm run lint` - Run linting on shared package code
- `npm run lint:fix` - Fix linting issues in shared package code
- `npm run test` - Run shared package tests
- `npm run test:watch` - Run shared package tests in watch mode
- `npm run test:coverage` - Run shared package tests with coverage reports
- `npm run clean` - Clean shared package build artifacts

## Using Turbo

Turbo is used to manage the monorepo and optimize the execution of scripts. You can use Turbo directly for more advanced use cases:

- `npx turbo run build --filter=@invoice-approval/frontend` - Build only the frontend
- `npx turbo run test --filter=@invoice-approval/backend` - Run tests only for the backend
- `npx turbo run dev --parallel` - Run dev servers in parallel

For more information on Turbo, see the [Turbo documentation](https://turbo.build/repo/docs).

