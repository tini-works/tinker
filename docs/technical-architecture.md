# Technical Architecture: Modern Invoice Approval System

## System Overview

This document provides detailed technical architecture for the invoice approval system migration from Express.js to a modern, type-safe stack.

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web Frontend]
        MOBILE[Mobile App]
    end

    subgraph "API Layer"
        HONO[Hono.js Server]
        RPC[Hono RPC]
        AUTH[better-auth]
    end

    subgraph "Business Layer"
        BL[Business Logic]
        WF[Workflow Engine]
        VAL[Validation Layer]
    end

    subgraph "Data Layer"
        DRIZZLE[Drizzle ORM]
        SQLITE[SQLite Database]
        CACHE[Cache Layer]
    end

    subgraph "External Services"
        GOOGLE[Google OAuth]
        PAYMENT[Payment System]
        EMAIL[Email Service]
    end

    WEB --> RPC
    MOBILE --> RPC
    RPC --> HONO
    HONO --> AUTH
    HONO --> BL
    BL --> WF
    BL --> VAL
    BL --> DRIZZLE
    DRIZZLE --> SQLITE
    DRIZZLE --> CACHE
    AUTH --> GOOGLE
    BL --> PAYMENT
    BL --> EMAIL
```

## Technology Stack Deep Dive

### Hono.js Framework

```mermaid
flowchart LR
    subgraph "Hono Features"
        A[Ultrafast Routing]
        B[Web Standards]
        C[Multi-Runtime]
        D[Zero Dependencies]
        E[TypeScript First]
    end

    subgraph "Middleware Stack"
        F[CORS]
        G[Authentication]
        H[Validation]
        I[Error Handling]
        J[Logging]
    end

    subgraph "Route Handlers"
        K[Invoice Routes]
        L[Payment Request Routes]
        M[User Routes]
        N[Approval Routes]
    end

    A --> F
    B --> G
    C --> H
    D --> I
    E --> J

    F --> K
    G --> L
    H --> M
    I --> N
```

### Drizzle ORM Architecture

```mermaid
flowchart TD
    subgraph "Schema Definition"
        A[TypeScript Schemas]
        B[Relationships]
        C[Constraints]
        D[Indexes]
    end

    subgraph "Query Builder"
        E[Type-Safe Queries]
        F[Join Operations]
        G[Aggregations]
        H[Transactions]
    end

    subgraph "Migration System"
        I[Schema Changes]
        J[Version Control]
        K[Rollback Support]
        L[Environment Sync]
    end

    subgraph "Database Layer"
        M[SQLite Connection]
        N[Connection Pool]
        O[Query Optimization]
        P[Performance Monitoring]
    end

    A --> E
    B --> F
    C --> G
    D --> H

    E --> I
    F --> J
    G --> K
    H --> L

    I --> M
    J --> N
    K --> O
    L --> P
```

## Authentication Flow

### better-auth Integration

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant H as Hono Server
    participant BA as better-auth
    participant DB as Database
    participant G as Google OAuth

    Note over U,G: Username/Password Flow
    U->>C: Login with email/password
    C->>H: POST /auth/sign-in
    H->>BA: Validate credentials
    BA->>DB: Check user credentials
    DB-->>BA: User data
    BA-->>H: Session token
    H-->>C: Set session cookie
    C-->>U: Redirect to dashboard

    Note over U,G: Google OAuth Flow
    U->>C: Click "Sign in with Google"
    C->>H: GET /auth/google
    H->>BA: Initiate OAuth
    BA->>G: Redirect to Google
    G-->>U: Google consent screen
    U->>G: Grant permission
    G->>H: Callback with code
    H->>BA: Exchange code for tokens
    BA->>DB: Create/update user
    DB-->>BA: User data
    BA-->>H: Session token
    H-->>C: Set session cookie
    C-->>U: Redirect to dashboard
```

### Session Management

```mermaid
stateDiagram-v2
    [*] --> Anonymous
    Anonymous --> Authenticating : Login Request
    Authenticating --> Authenticated : Success
    Authenticating --> Anonymous : Failure
    Authenticated --> Refreshing : Token Near Expiry
    Refreshing --> Authenticated : Success
    Refreshing --> Anonymous : Failure
    Authenticated --> Anonymous : Logout
    Authenticated --> Anonymous : Session Expired

    note right of Authenticated
        Session stored in:
        - HTTP-only cookie
        - Database record
        - Memory cache
    end note
```

## Business Process Workflow

### Invoice Processing Pipeline

```mermaid
flowchart TD
    A[Upload Invoice Batch] --> B{Validate Format}
    B -->|Invalid| C[Return Error 01001]
    B -->|Valid| D[Parse Invoice Data]
    D --> E{Check Duplicates}
    E -->|Duplicate| F[Return Error 01002]
    E -->|Unique| G[Validate Required Fields]
    G -->|Missing| H[Return Error 01003]
    G -->|Complete| I[Save to Database]
    I --> J[Log Process 01: Success]
    J --> K[Return Success Response]

    C --> L[Log Process 01: Failed]
    F --> L
    H --> L
```

### Payment Request Approval Workflow

```mermaid
flowchart TD
    A[Create Payment Request] --> B[Link Invoices]
    B --> C[Calculate Total Amount]
    C --> D[Determine Approval Route]
    D --> E{Amount > $10,000?}
    E -->|Yes| F[Multi-Stage Approval]
    E -->|No| G[Single Approval]

    F --> H[Stage 1: Department Head]
    H --> I{Approved?}
    I -->|No| J[Request Changes]
    I -->|Yes| K[Stage 2: Finance Director]
    K --> L{Approved?}
    L -->|No| J
    L -->|Yes| M[Mark as Approved]

    G --> N[Single Approver Review]
    N --> O{Approved?}
    O -->|No| J
    O -->|Yes| M

    J --> P[Update PR Status]
    P --> Q[Notify Creator]

    M --> R[Ready for Payment]
    R --> S[External Payment Process]
    S --> T[Mark as Completed]
```

## Data Flow Architecture

### Request Processing Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant M as Middleware
    participant R as Route Handler
    participant BL as Business Logic
    participant V as Validator
    participant D as Drizzle ORM
    participant DB as SQLite
    participant L as Logger

    C->>M: HTTP Request
    M->>M: CORS Check
    M->>M: Authentication
    M->>R: Validated Request
    R->>V: Validate Input
    V-->>R: Validation Result
    R->>BL: Execute Business Logic
    BL->>D: Database Query
    D->>DB: SQL Query
    DB-->>D: Query Result
    D-->>BL: Typed Result
    BL->>L: Log Business Process
    BL-->>R: Business Result
    R-->>C: HTTP Response
```

### Error Handling Flow

```mermaid
flowchart TD
    A[Request Received] --> B{Validation Error?}
    B -->|Yes| C[Return 400 + Error Code]
    B -->|No| D{Authentication Error?}
    D -->|Yes| E[Return 401]
    D -->|No| F{Authorization Error?}
    F -->|Yes| G[Return 403]
    F -->|No| H[Process Request]
    H --> I{Business Logic Error?}
    I -->|Yes| J[Log Error + Return Error Code]
    I -->|No| K{Database Error?}
    K -->|Yes| L[Log Error + Return 500]
    K -->|No| M[Return Success]

    C --> N[Log Error Details]
    J --> N
    L --> N
    N --> O[Update Business Process Log]
```

## Database Design Details

### Entity Relationships

```mermaid
erDiagram
    User {
        string id PK
        string email UK
        string name
        string role
        boolean emailVerified
        string image
        datetime createdAt
        datetime updatedAt
    }

    Session {
        string id PK
        string userId FK
        datetime expiresAt
        string token UK
        string ipAddress
        string userAgent
    }

    Account {
        string id PK
        string userId FK
        string accountId
        string providerId
        string accessToken
        string refreshToken
        datetime expiresAt
    }

    Invoice {
        string id PK
        string batchId
        decimal amount
        date invoiceDate
        string vendor
        string status
        string importedBy FK
        json metadata
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
        json approvalWorkflow
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
        text comments
        json metadata
        datetime createdAt
    }

    BusinessProcessLog {
        string id PK
        int processIndex
        string entityType
        string entityId
        string status
        string errorCode
        json details
        datetime createdAt
    }

    User ||--o{ Session : has
    User ||--o{ Account : has
    User ||--o{ Invoice : imports
    User ||--o{ PaymentRequest : creates
    User ||--o{ ApprovalHistory : approves
    Invoice ||--o{ InvoicePaymentRequest : links
    PaymentRequest ||--o{ InvoicePaymentRequest : contains
    PaymentRequest ||--o{ ApprovalHistory : tracks
```

### Database Constraints and Triggers

```sql
-- Ensure invoice amounts are positive
ALTER TABLE invoices ADD CONSTRAINT chk_invoice_amount_positive
CHECK (amount > 0);

-- Ensure payment request total matches linked invoices
CREATE TRIGGER update_payment_request_total
AFTER INSERT ON invoice_payment_requests
BEGIN
    UPDATE payment_requests
    SET total_amount = (
        SELECT SUM(i.amount)
        FROM invoices i
        JOIN invoice_payment_requests ipr ON i.id = ipr.invoice_id
        WHERE ipr.payment_request_id = NEW.payment_request_id
    )
    WHERE id = NEW.payment_request_id;
END;

-- Audit trail trigger
CREATE TRIGGER audit_payment_request_changes
AFTER UPDATE ON payment_requests
BEGIN
    INSERT INTO business_process_logs (
        process_index, entity_type, entity_id, status, details, created_at
    ) VALUES (
        CASE
            WHEN NEW.status = 'in_review' THEN 4
            WHEN NEW.status = 'approved' THEN 8
            WHEN NEW.status = 'completed' THEN 10
        END,
        'payment_request',
        NEW.id,
        'completed',
        json_object('old_status', OLD.status, 'new_status', NEW.status),
        CURRENT_TIMESTAMP
    );
END;
```

## API Design

### Hono RPC Type Definitions

```typescript
// Shared types between client and server
export interface InvoiceCreateRequest {
  batchId: string;
  invoices: {
    amount: number;
    invoiceDate: string;
    vendor: string;
    metadata?: Record<string, any>;
  }[];
}

export interface PaymentRequestCreateRequest {
  invoiceIds: string[];
  requestDate: string;
  approvalWorkflow?: {
    stages: {
      approverId: string;
      order: number;
    }[];
  };
}

// API route definitions
const invoiceRoutes = new Hono()
  .post('/import', zValidator('json', invoiceCreateSchema), async c => {
    // Implementation
  })
  .get('/:id', async c => {
    // Implementation
  });

const paymentRequestRoutes = new Hono()
  .post('/', zValidator('json', paymentRequestCreateSchema), async c => {
    // Implementation
  })
  .post('/:id/submit', async c => {
    // Implementation
  })
  .post('/:id/approve', async c => {
    // Implementation
  });

// Export type for client
export type AppType = typeof app;
```

### Client-Side Usage

```typescript
import { hc } from 'hono/client';
import type { AppType } from '../server/app';

const client = hc<AppType>('http://localhost:3000');

// Type-safe API calls
const response = await client.invoices.import.$post({
  json: {
    batchId: 'batch-001',
    invoices: [
      {
        amount: 1000.0,
        invoiceDate: '2024-01-15',
        vendor: 'Acme Corp',
      },
    ],
  },
});

if (response.ok) {
  const data = await response.json(); // Fully typed
}
```

## Performance Considerations

### Database Optimization

```mermaid
flowchart LR
    subgraph "Query Optimization"
        A[Strategic Indexes]
        B[Query Planning]
        C[Connection Pooling]
        D[Prepared Statements]
    end

    subgraph "Caching Strategy"
        E[In-Memory Cache]
        F[Query Result Cache]
        G[Session Cache]
        H[Static Asset Cache]
    end

    subgraph "Monitoring"
        I[Query Performance]
        J[Connection Metrics]
        K[Cache Hit Rates]
        L[Error Tracking]
    end

    A --> E
    B --> F
    C --> G
    D --> H

    E --> I
    F --> J
    G --> K
    H --> L
```

### Scalability Patterns

```mermaid
flowchart TD
    A[Load Balancer] --> B[Hono Instance 1]
    A --> C[Hono Instance 2]
    A --> D[Hono Instance N]

    B --> E[Shared SQLite]
    C --> E
    D --> E

    E --> F[Read Replicas]
    E --> G[Backup System]

    H[Redis Cache] --> B
    H --> C
    H --> D

    I[File Storage] --> B
    I --> C
    I --> D
```

## Security Architecture

### Defense in Depth

```mermaid
flowchart TD
    subgraph "Network Layer"
        A[HTTPS/TLS]
        B[CORS Policy]
        C[Rate Limiting]
    end

    subgraph "Application Layer"
        D[Input Validation]
        E[Authentication]
        F[Authorization]
        G[Session Security]
    end

    subgraph "Data Layer"
        H[SQL Injection Prevention]
        I[Data Encryption]
        J[Access Logging]
        K[Backup Encryption]
    end

    A --> D
    B --> E
    C --> F

    D --> H
    E --> I
    F --> J
    G --> K
```

### Threat Model

| Threat               | Mitigation            | Implementation           |
| -------------------- | --------------------- | ------------------------ |
| SQL Injection        | Parameterized Queries | Drizzle ORM              |
| XSS                  | Input Sanitization    | Zod Validation           |
| CSRF                 | Token Validation      | better-auth              |
| Session Hijacking    | Secure Cookies        | HTTP-only, Secure flags  |
| Data Breach          | Encryption            | At-rest and in-transit   |
| Privilege Escalation | Role-based Access     | Authorization middleware |

## Deployment Architecture

### Environment Strategy

```mermaid
flowchart LR
    subgraph "Development"
        A[Local SQLite]
        B[Mock Services]
        C[Debug Logging]
    end

    subgraph "Testing"
        D[In-Memory DB]
        E[Test Fixtures]
        F[Coverage Reports]
    end

    subgraph "Staging"
        G[Staging SQLite]
        H[Real OAuth]
        I[Performance Testing]
    end

    subgraph "Production"
        J[Optimized SQLite]
        K[Monitoring]
        L[Error Tracking]
    end

    A --> D
    D --> G
    G --> J
```

### CI/CD Pipeline

```mermaid
flowchart TD
    A[Code Commit] --> B[Lint & Format]
    B --> C[Type Check]
    C --> D[Unit Tests]
    D --> E[Integration Tests]
    E --> F[Build Application]
    F --> G[Security Scan]
    G --> H[Deploy to Staging]
    H --> I[E2E Tests]
    I --> J{Tests Pass?}
    J -->|Yes| K[Deploy to Production]
    J -->|No| L[Notify Developers]
    K --> M[Health Checks]
    M --> N[Monitor Metrics]
```

This technical architecture provides a comprehensive foundation for building a modern, scalable, and secure invoice approval system using the latest web development technologies and best practices.
