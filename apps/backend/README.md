# Tinker Backend API

Modern Hono.js backend for the Tinker invoice approval system, built with TypeScript, Drizzle ORM, and better-auth.

## Features

- 🔥 **Hono.js** - Ultra-fast web framework built on Web Standards
- 🗄️ **Drizzle ORM** - Type-safe database operations with SQLite
- 🔐 **better-auth** - Comprehensive authentication with OAuth support
- 📝 **TypeScript** - Full type safety throughout the application
- 🧪 **Vitest** - Fast unit testing with coverage reports
- 📊 **Structured Logging** - Winston-based logging with multiple formats
- 🔍 **ESLint + Prettier** - Code quality and formatting

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# At minimum, set BETTER_AUTH_SECRET to a secure 32+ character string
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

### Database

```bash
# Generate database schema
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio

# Seed database with test data
npm run db:seed
```

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status
- `GET /` - API information

## Project Structure

```
src/
├── config/          # Configuration and environment variables
├── db/              # Database schema, migrations, and seeds
├── middleware/      # Custom middleware functions
├── routes/          # API route handlers
├── services/        # Business logic services
├── types/           # TypeScript type definitions
├── utils/           # Utility functions and helpers
├── tests/           # Test files and setup
└── index.ts         # Application entry point
```

## Environment Variables

See `.env.example` for all available configuration options.

Required variables:
- `BETTER_AUTH_SECRET` - Secret key for authentication (32+ characters)

## Tech Stack

- **Framework**: Hono.js v4.8.5
- **Runtime**: Node.js with @hono/node-server
- **Database**: SQLite with Drizzle ORM v0.36.4
- **Authentication**: better-auth v1.3.3
- **Validation**: Zod
- **Testing**: Vitest
- **Logging**: Winston
- **Code Quality**: ESLint + Prettier

## License

MIT
