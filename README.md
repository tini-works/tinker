# Invoice Approval System

A monorepo for the Invoice Approval System, containing both frontend and backend code.

## Project Overview

The Invoice Approval System is designed to manage the process of importing invoices, creating payment requests, and handling approvals. The system allows users to:

- Import invoices in batches
- Create payment requests linked to one or more invoices
- Route payment requests through approval workflows
- Track the status of invoices and payment requests
- Complete the payment process and mark requests as completed

## Repository Structure

```
.
├── apps/
│   ├── frontend/     # React frontend application
│   └── backend/      # Express backend API
├── packages/
│   └── shared/       # Shared types and utilities
└── docs/             # Project documentation
```

### Workspaces

- **Frontend (apps/frontend)**: A React application built with Vite, Tailwind CSS 4, and DaisyUI v5. It provides the user interface for the Invoice Approval System.

- **Backend (apps/backend)**: An Express API that handles data storage, business logic, and API endpoints for the Invoice Approval System.

- **Shared (packages/shared)**: A package containing shared types, interfaces, and utility functions used by both the frontend and backend.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v10 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/tini-works/tinker.git
cd tinker
```

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

The frontend will be available at http://localhost:5173 and the backend at http://localhost:4000.

### Building

To build all applications:

```bash
npm run build
```

To build a specific workspace:

```bash
npm run build --filter=@invoice-approval/frontend
```

### Testing

To run tests for all applications:

```bash
npm run test
```

To run tests for a specific workspace:

```bash
npm run test --filter=@invoice-approval/frontend
```

### Linting

To lint all applications:

```bash
npm run lint
```

To lint a specific workspace:

```bash
npm run lint --filter=@invoice-approval/frontend
```

### Formatting

To format all code:

```bash
npm run format
```

## Monorepo Structure

This project uses [Turborepo](https://turbo.build/) to manage the monorepo structure. The key configuration files are:

- **package.json**: Defines workspaces and root-level scripts
- **turbo.json**: Configures the Turborepo pipeline
- **tsconfig.base.json**: Provides base TypeScript configuration for all workspaces

### Shared Package

The shared package contains common types and utilities used by both the frontend and backend. To use the shared package in a workspace:

```typescript
// Import shared types
import { Invoice, PaymentRequest } from '@invoice-approval/shared';

// Import shared utilities
import { formatCurrency, formatDate } from '@invoice-approval/shared';
```

## Tech Stack

- **Build Tools**: Turborepo, Vite
- **Frontend**: React, React Router, Tailwind CSS, DaisyUI
- **Backend**: Express, Node.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, DaisyUI v5
- **Testing**: Vitest (frontend), Jest (backend)
- **Linting**: ESLint, Prettier

## Documentation

The project documentation is built using [MkDocs](https://www.mkdocs.org/) with the [Material theme](https://squidfunk.github.io/mkdocs-material/) and includes support for [Mermaid diagrams](https://mermaid.js.org/).

### Viewing Documentation

To view the documentation locally:

1. Install MkDocs and the Material theme:
   ```bash
   pip install mkdocs-material
   ```

2. Serve the documentation:
   ```bash
   mkdocs serve
   ```

3. Open your browser and navigate to http://localhost:8000

### Documentation Structure

The documentation is organized as follows:

- `docs/index.md`: Home page
- `docs/1_event_storming.md`: Event Storming documentation
- `docs/2_user_journeys.md`: User Journeys documentation
- `docs/3_touch_points_screens.md`: Touch Points & Screens documentation
- `docs/4_screen_mockups.md`: Screen Mockups documentation
- `docs/5_screen_variations.md`: Screen Variations documentation
- `docs/6_summary.md`: Summary documentation

## Contributing

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Run tests and linting to ensure code quality
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

