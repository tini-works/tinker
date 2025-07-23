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

- Node.js (v24 or later)
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

## Automated PR Merging

This repository is configured with an automatic PR merging system. When a pull request passes all required checks, it will be automatically merged.

### How It Works

1. When a PR is opened, updated, or a check suite completes, the auto-merge workflow runs
2. The workflow checks if:
   - The PR is not in draft mode
   - All required checks have passed
   - The PR can be merged (no merge conflicts)
3. If all conditions are met, the PR is automatically merged

### Manual Triggering

You can manually trigger the auto-merge workflow by:

1. Going to the Actions tab in the GitHub repository
2. Selecting the "Auto Merge PRs" workflow
3. Clicking "Run workflow"

## Tech Stack

- **Build Tools**: Turborepo, Vite
- **Frontend**: React, React Router, Tailwind CSS, DaisyUI
- **Backend**: Express, Node.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, DaisyUI v5
- **Testing**: Vitest, Jest
- **Linting**: ESLint, Prettier

## Documentation

The documentation is built using [VitePress](https://vitepress.dev/) and includes support for [Mermaid diagrams](https://mermaid.js.org/).

### Viewing Documentation Locally

To view the documentation locally:

1. Install dependencies (if not already done):

   ```bash
   npm install
   ```

2. Serve the documentation:

   ```bash
   npm run docs:dev
   ```

3. Open your browser and navigate to http://localhost:5173

### Building Documentation

To build the documentation for production:

```bash
npm run docs:build
```

The built documentation will be available in `docs/.vitepress/dist/`.

### Documentation Structure

The documentation is organized as follows:

- `docs/index.md`: Home page
- `docs/1_event_storming.md`: Event Storming documentation
- `docs/2_user_journeys.md`: User Journeys documentation
- `docs/3_touch_points_screens.md`: Touch Points & Screens documentation
- `docs/4_screen_mockups.md`: Screen Mockups documentation
- `docs/5_screen_variations.md`: Screen Variations documentation
- `docs/6_summary.md`: Summary documentation
- `docs/mermaid_example.md`: Examples of Mermaid diagrams

### Using Mermaid Diagrams

You can create diagrams in your documentation using Mermaid syntax. For example:

````markdown
```mermaid
flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[Alternative Action]
```
````

See the [Mermaid example page](docs/mermaid_example.md) for more examples.

### Automated Deployment

The documentation is automatically built and deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by a GitHub Actions workflow defined in `.github/workflows/docs.yml`.

You can also manually trigger the deployment by going to the Actions tab in the GitHub repository and running the "Build and Deploy Documentation" workflow.
