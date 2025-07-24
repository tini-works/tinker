# Database Implementation Plan: Invoice Approval System

## Overview

This document outlines the comprehensive database implementation plan for the Tinker invoice approval system, transitioning from Express.js to a modern tech stack with Hono, Drizzle ORM, SQLite, and better-auth.

## Tech Stack

### Core Technologies
- **Backend Framework**: Hono.js (latest) - Ultrafast web framework built on Web Standards
- **Database ORM**: Drizzle ORM v0.32.1 - TypeScript-first ORM with SQLite support
- **Database**: SQLite - Lightweight, serverless database
- **Authentication**: better-auth - Comprehensive TypeScript authentication library
- **Client-Server Communication**: Hono RPC - Type-safe API communication
- **Testing**: Vitest - Fast unit testing framework

### Key Benefits
- **Type Safety**: End-to-end TypeScript with full type inference
- **Performance**: Hono's ultrafast routing with SQLite's efficiency
- **Developer Experience**: Auto-generated schemas, type-safe APIs, excellent tooling
- **Authentication**: Built-in OAuth + username/password with Drizzle integration

## Database Architecture

### Domain Model Overview

Based on our eventstorming analysis, the system revolves around two main aggregates:

```mermaid
erDiagram
    User {
        string id PK
        string email
        string name
        string role
        datetime createdAt
        datetime updatedAt
    }
    
    Session {
        string id PK
        string userId FK
        datetime expiresAt
        string token
    }
    
    Invoice {
        string id PK
        string batchId
        decimal amount
        date invoiceDate
        string vendor
        string status
        string importedBy FK
        datetime createdAt
        datetime updatedAt
    }
    
    PaymentRequest {
        string id PK
        decimal totalAmount
        date requestDate
        string status
        string createdBy FK
        string currentApprover FK
        datetime createdAt
        datetime updatedAt
    }
    
    InvoicePaymentRequest {
        string invoiceId FK
        string paymentRequestId FK
        datetime linkedAt
    }
    
    ApprovalHistory {
        string id PK
        string paymentRequestId FK
        string approverId FK
        string action
        string comments
        datetime createdAt
    }
    
    BusinessProcessLog {
        string id PK
        int processIndex
        string entityType
        string entityId
        string status
        string errorCode
        string details
        datetime createdAt
    }
    
    User ||--o{ Invoice : imports
    User ||--o{ PaymentRequest : creates
    User ||--o{ ApprovalHistory : approves
    Invoice ||--o{ InvoicePaymentRequest : links
    PaymentRequest ||--o{ InvoicePaymentRequest : contains
    PaymentRequest ||--o{ ApprovalHistory : tracks
```

### State Management

#### Invoice States
```mermaid
stateDiagram-v2
    [*] --> Imported : Import Invoices
    Imported --> Linked : Link to Payment Request
    Linked --> Completed : Payment Request Completed
    Linked --> Obsolete : Mark as Obsolete
    Completed --> [*]
    Obsolete --> [*]
```

#### Payment Request States
```mermaid
stateDiagram-v2
    [*] --> Draft : Create Payment Request
    Draft --> InReview : Submit for Approval
    InReview --> Draft : Request Changes
    InReview --> Approved : Approve
    Approved --> Completed : Mark as Completed
    Completed --> [*]
    
    note right of InReview
        Multi-stage approval
        workflow supported
    end note
```

## Business Process Index & Error Codes

### Process Index System

Each business operation is assigned a unique index number for tracking and error reporting:

```mermaid
flowchart TD
    A[Business Process Index] --> B[01: Import Invoices]
    A --> C[02: Create Payment Request]
    A --> D[03: Link Invoices to PR]
    A --> E[04: Submit for Approval]
    A --> F[05: Review Payment Request]
    A --> G[06: Request Changes]
    A --> H[07: Make Changes]
    A --> I[08: Approve Payment Request]
    A --> J[09: Make Payment]
    A --> K[10: Mark as Completed]
    A --> L[11: Revert Payment Request]
    
    B --> B1[Error Codes: 01001-01099]
    C --> C1[Error Codes: 02001-02099]
    D --> D1[Error Codes: 03001-03099]
    E --> E1[Error Codes: 04001-04099]
    F --> F1[Error Codes: 05001-05099]
    G --> G1[Error Codes: 06001-06099]
    H --> H1[Error Codes: 07001-07099]
    I --> I1[Error Codes: 08001-08099]
    J --> J1[Error Codes: 09001-09099]
    K --> K1[Error Codes: 10001-10099]
    L --> L1[Error Codes: 11001-11099]
```

### Error Code Structure

Format: `PPXXX` where:
- `PP`: Process index (01-11)
- `XXX`: Specific error code (001-099)

#### Example Error Codes

| Process | Error Code | Description |
|---------|------------|-------------|
| 01 (Import) | 01001 | Invalid file format |
| 01 (Import) | 01002 | Duplicate invoice detected |
| 01 (Import) | 01003 | Missing required fields |
| 02 (Create PR) | 02001 | Insufficient permissions |
| 02 (Create PR) | 02002 | Invalid amount |
| 03 (Link) | 03001 | Invoice already linked |
| 03 (Link) | 03002 | Invoice not found |
| 04 (Submit) | 04001 | No invoices linked |
| 04 (Submit) | 04002 | Invalid approval workflow |

## Authentication & Authorization

### better-auth Integration

```mermaid
flowchart LR
    A[Client Request] --> B[Hono Middleware]
    B --> C[better-auth Validation]
    C --> D{Valid Session?}
    D -->|Yes| E[Extract User Info]
    D -->|No| F[Return 401]
    E --> G[Check Role Permissions]
    G --> H{Authorized?}
    H -->|Yes| I[Process Request]
    H -->|No| J[Return 403]
    I --> K[Return Response]
```

### User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Invoice Processor** | Import invoices, view invoice status |
| **Payment Request Creator** | Create PRs, link invoices, submit for approval |
| **Approver** | Review PRs, approve/reject, request changes |
| **Finance Officer** | Mark payments as completed, view all data |
| **Admin** | Full system access, user management |

### Authentication Methods

1. **Username/Password**: Traditional email/password authentication
2. **Google OAuth**: Single sign-on with Google accounts
3. **Session Management**: Secure session handling with automatic cleanup

## API Architecture

### Hono RPC Implementation

```mermaid
sequenceDiagram
    participant C as Client
    participant H as Hono Server
    participant D as Drizzle ORM
    participant DB as SQLite Database
    participant A as better-auth
    
    C->>H: API Request (Type-safe)
    H->>A: Validate Session
    A-->>H: User Info
    H->>D: Database Query
    D->>DB: SQL Query
    DB-->>D: Results
    D-->>H: Typed Results
    H-->>C: Type-safe Response
```

### API Endpoints Structure

```typescript
// Type-safe API routes
const routes = app
  .route('/auth', authRoutes)
  .route('/invoices', invoiceRoutes)
  .route('/payment-requests', paymentRequestRoutes)
  .route('/approvals', approvalRoutes)

export type AppType = typeof routes
```

## Database Schema Implementation

### Core Tables

#### Users & Authentication (better-auth generated)
```sql
-- Auto-generated by better-auth
CREATE TABLE user (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    emailVerified BOOLEAN DEFAULT FALSE,
    image TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE session (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    expiresAt DATETIME NOT NULL,
    token TEXT UNIQUE NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE account (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    accountId TEXT NOT NULL,
    providerId TEXT NOT NULL,
    accessToken TEXT,
    refreshToken TEXT,
    expiresAt DATETIME,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);
```

#### Business Domain Tables
```sql
CREATE TABLE invoices (
    id TEXT PRIMARY KEY,
    batch_id TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    invoice_date DATE NOT NULL,
    vendor TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('imported', 'linked', 'completed', 'obsolete')),
    imported_by TEXT NOT NULL,
    metadata JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (imported_by) REFERENCES user(id)
);

CREATE TABLE payment_requests (
    id TEXT PRIMARY KEY,
    total_amount DECIMAL(10,2) NOT NULL,
    request_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('draft', 'in_review', 'approved', 'completed')),
    created_by TEXT NOT NULL,
    current_approver TEXT,
    approval_workflow JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES user(id),
    FOREIGN KEY (current_approver) REFERENCES user(id)
);

CREATE TABLE invoice_payment_requests (
    invoice_id TEXT NOT NULL,
    payment_request_id TEXT NOT NULL,
    linked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (invoice_id, payment_request_id),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
    FOREIGN KEY (payment_request_id) REFERENCES payment_requests(id) ON DELETE CASCADE
);

CREATE TABLE approval_history (
    id TEXT PRIMARY KEY,
    payment_request_id TEXT NOT NULL,
    approver_id TEXT NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('submitted', 'approved', 'rejected', 'changes_requested')),
    comments TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_request_id) REFERENCES payment_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (approver_id) REFERENCES user(id)
);

CREATE TABLE business_process_logs (
    id TEXT PRIMARY KEY,
    process_index INTEGER NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('started', 'completed', 'failed')),
    error_code TEXT,
    details JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Indexes for Performance
```sql
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_batch_id ON invoices(batch_id);
CREATE INDEX idx_payment_requests_status ON payment_requests(status);
CREATE INDEX idx_payment_requests_created_by ON payment_requests(created_by);
CREATE INDEX idx_approval_history_pr_id ON approval_history(payment_request_id);
CREATE INDEX idx_business_process_logs_entity ON business_process_logs(entity_type, entity_id);
CREATE INDEX idx_business_process_logs_process ON business_process_logs(process_index);
```

## Migration Strategy

### Migration Workflow

```mermaid
flowchart TD
    A[Current Express App] --> B[Install New Dependencies]
    B --> C[Setup Drizzle Config]
    C --> D[Create Initial Migration]
    D --> E[Setup better-auth]
    E --> F[Create Hono App Structure]
    F --> G[Implement API Routes]
    G --> H[Add Authentication Middleware]
    H --> I[Create Seed Data]
    I --> J[Setup Testing]
    J --> K[Update Documentation]
    K --> L[Deploy & Test]
```

### Migration Commands
```bash
# Install dependencies
npm install hono drizzle-orm better-auth @hono/zod-validator zod

# Setup Drizzle
npx drizzle-kit generate:sqlite
npx drizzle-kit migrate

# Run seeds
npm run db:seed

# Run tests
npm run test
```

## Testing Strategy

### Test Structure

```mermaid
flowchart LR
    A[Unit Tests] --> B[API Integration Tests]
    B --> C[Database Tests]
    C --> D[Authentication Tests]
    D --> E[End-to-End Tests]
    
    A --> A1[Business Logic]
    A --> A2[Validation]
    A --> A3[Error Handling]
    
    B --> B1[Route Handlers]
    B --> B2[Middleware]
    B --> B3[RPC Types]
    
    C --> C1[Schema Validation]
    C --> C2[Migrations]
    C --> C3[Seed Data]
    
    D --> D1[Login/Logout]
    D --> D2[OAuth Flow]
    D --> D3[Session Management]
    
    E --> E1[Complete Workflows]
    E --> E2[User Journeys]
```

### Test Data Management

- **Fixtures**: Predefined test data for consistent testing
- **Factories**: Dynamic test data generation
- **Database Isolation**: Each test runs with clean database state
- **Mock External Services**: Mock payment systems and OAuth providers

## Deployment Considerations

### Environment Configuration

```mermaid
flowchart LR
    A[Development] --> B[Testing]
    B --> C[Preview]
    C --> D[Production]
    
    A --> A1[SQLite File]
    A --> A2[Local OAuth]
    A --> A3[Debug Logging]
    
    B --> B1[In-Memory DB]
    B --> B2[Mock Services]
    B --> B3[Test Coverage]
    
    C --> C1[SQLite File]
    C --> C2[Real OAuth]
    C --> C3[Performance Monitoring]
    
    D --> D1[Optimized SQLite]
    D --> D2[Production OAuth]
    D --> D3[Error Tracking]
```

### Performance Optimizations

1. **Database Indexing**: Strategic indexes on frequently queried columns
2. **Connection Pooling**: Efficient database connection management
3. **Caching**: Redis for session and frequently accessed data
4. **Query Optimization**: Use Drizzle's query builder for efficient SQL
5. **Pagination**: Implement cursor-based pagination for large datasets

## Security Considerations

### Data Protection

```mermaid
flowchart TD
    A[Input Validation] --> B[Authentication]
    B --> C[Authorization]
    C --> D[Data Encryption]
    D --> E[Audit Logging]
    E --> F[Error Handling]
    
    A --> A1[Zod Schemas]
    A --> A2[SQL Injection Prevention]
    
    B --> B1[better-auth Sessions]
    B --> B2[OAuth Integration]
    
    C --> C1[Role-Based Access]
    C --> C2[Resource Permissions]
    
    D --> D1[Sensitive Data Hashing]
    D --> D2[Token Encryption]
    
    E --> E1[Business Process Logs]
    E --> E2[Access Logs]
    
    F --> F1[Safe Error Messages]
    F --> F2[No Data Leakage]
```

### Security Measures

1. **Input Validation**: Comprehensive validation using Zod schemas
2. **SQL Injection Prevention**: Parameterized queries via Drizzle ORM
3. **Authentication**: Secure session management with better-auth
4. **Authorization**: Role-based access control for all endpoints
5. **Data Encryption**: Sensitive data encryption at rest and in transit
6. **Audit Trail**: Complete logging of all business operations
7. **Error Handling**: Safe error messages without data leakage

## Monitoring & Observability

### Logging Strategy

```mermaid
flowchart LR
    A[Application Logs] --> D[Log Aggregation]
    B[Business Process Logs] --> D
    C[Error Logs] --> D
    D --> E[Monitoring Dashboard]
    E --> F[Alerts]
    
    A --> A1[Request/Response]
    A --> A2[Performance Metrics]
    
    B --> B1[Process Index Tracking]
    B --> B2[State Transitions]
    
    C --> C1[Error Codes]
    C --> C2[Stack Traces]
```

### Key Metrics

1. **Business Metrics**: Invoice processing rates, approval times, error rates
2. **Technical Metrics**: API response times, database query performance
3. **Security Metrics**: Failed authentication attempts, suspicious activities
4. **User Experience**: Page load times, user journey completion rates

## Next Steps

1. **Phase 1**: Setup tech stack and basic database schema
2. **Phase 2**: Implement authentication and core API endpoints
3. **Phase 3**: Add business logic and approval workflows
4. **Phase 4**: Create comprehensive test suite
5. **Phase 5**: Deploy to preview environment and gather feedback
6. **Phase 6**: Production deployment with monitoring

This implementation plan provides a solid foundation for building a modern, type-safe, and scalable invoice approval system that leverages the best practices in current web development.

