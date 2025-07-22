# Mermaid Diagram Examples

This page demonstrates how to use Mermaid diagrams in your documentation.

## Flow Chart Example

```mermaid
flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]
```

## Sequence Diagram Example

```mermaid
sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Request data
    System->>Database: Query data
    Database-->>System: Return results
    System-->>User: Display results
```

## Class Diagram Example

```mermaid
classDiagram
    class Invoice {
        +id: string
        +amount: number
        +date: Date
        +process()
        +markAsCompleted()
    }
    
    class PaymentRequest {
        +id: string
        +invoices: Invoice[]
        +status: string
        +createRequest()
        +approve()
        +reject()
    }
    
    PaymentRequest "1" --> "*" Invoice: contains
```

## State Diagram Example

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Review: Submit
    Review --> Approved: Approve
    Review --> Rejected: Reject
    Rejected --> Draft: Revise
    Approved --> Completed: Process payment
    Completed --> [*]
```

## How to Use Mermaid in Your Documentation

To create a Mermaid diagram, use the following syntax:

````markdown
```mermaid
flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[Alternative Action]
```
````

For more information on Mermaid syntax, visit the [Mermaid documentation](https://mermaid.js.org/intro/).

