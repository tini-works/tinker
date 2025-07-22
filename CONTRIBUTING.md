# Contributing to the Invoice Approval System

Thank you for considering contributing to the Invoice Approval System! This document provides guidelines and instructions for contributing to this project.

## Development Workflow

### Setting Up the Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/tini-works/tinker.git
   cd tinker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development servers:
   ```bash
   npm run dev
   ```

### Monorepo Structure

This project uses Turborepo to manage the monorepo structure. The repository is organized as follows:

- **apps/frontend**: React frontend application
- **apps/backend**: Express backend API
- **packages/shared**: Shared types and utilities

### Working with Workspaces

#### Running Commands for Specific Workspaces

You can run commands for specific workspaces using the `--filter` flag:

```bash
# Start only the frontend
npm run dev --filter=@invoice-approval/frontend

# Build only the backend
npm run build --filter=@invoice-approval/backend

# Run tests for the shared package
npm run test --filter=@invoice-approval/shared
```

#### Adding Dependencies to Workspaces

To add a dependency to a specific workspace:

```bash
# Add a dependency to the frontend
cd apps/frontend
npm install react-query

# Add a dependency to the backend
cd apps/backend
npm install mongoose

# Add a dependency to the shared package
cd packages/shared
npm install zod
```

#### Creating Shared Code

When creating shared code that will be used by both frontend and backend:

1. Add the code to the `packages/shared` directory
2. Export it from the main `index.ts` file
3. Import it in the frontend or backend using `import { ... } from '@invoice-approval/shared'`

### Code Style and Quality

#### TypeScript

- Use TypeScript for all code
- Define interfaces for all data structures
- Use proper type annotations for functions and variables
- Avoid using `any` type when possible

#### Linting and Formatting

- Run linting before committing changes:
  ```bash
  npm run lint
  ```

- Format code using Prettier:
  ```bash
  npm run format
  ```

#### Testing

- Write tests for all new features and bug fixes
- Run tests before submitting a pull request:
  ```bash
  npm run test
  ```

### Git Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them with descriptive commit messages:
   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   ```

3. Push your branch to the remote repository:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a pull request on GitHub

### Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Ensure all tests pass
- Make sure the code passes linting
- Keep pull requests focused on a single feature or bugfix

## Project-Specific Guidelines

### Frontend Development

- Use React functional components with hooks
- Use React Router for navigation
- Use Tailwind CSS for styling
- Use DaisyUI components when appropriate
- Organize components by feature or page

### Backend Development

- Use Express for API endpoints
- Organize routes by resource
- Use middleware for common functionality
- Validate request data
- Handle errors properly

### Shared Code

- Keep shared code minimal and focused
- Avoid dependencies on frontend or backend-specific libraries
- Use TypeScript interfaces for data structures
- Export utility functions that can be used by both frontend and backend

## Getting Help

If you have questions or need help, please:

1. Check the documentation
2. Look for existing issues on GitHub
3. Create a new issue if needed

Thank you for contributing to the Invoice Approval System!

